import { BrowserWindow, ipcMain } from 'electron';
import fs from 'fs-extra';
import _ from 'lodash';
import {
  connectToLastConnection,
  disconnectAll,
  executeSudoCommand,
  getAppDataPath,
  getConnectionStatus,
  modifyContent,
} from '../../src/utils/common';
import { COMMANDS } from '../../src/utils/constant';
import { OPEN_VPN } from '../../src/utils/enums/ipc.openvpn';
import Tunnelbear from '../../types/tunnelbear';
import { appState } from '../main';
import { setTray } from './tray';

export const setupVpn = (mainWindow: BrowserWindow) => {
  const sendAppState = () =>
    mainWindow.webContents.send(
      OPEN_VPN.OPEN_VPN_EVENT,
      _.omit(appState, ['tray'])
    );

  ipcMain.handle(
    OPEN_VPN.CONNECT_VPN,
    async (
      event,
      dirPath: string,
      credentials: Tunnelbear.Schema['Credential'],
      contents: string[]
    ) => {
      appState.isProcessing = true;
      sendAppState();

      const appDataPath = getAppDataPath();
      const { results } = modifyContent(contents, credentials);

      await Promise.all(
        _.compact([
          !_.isEmpty(results.credentials) &&
            fs.writeFile(
              `${appDataPath}/credentials.conf`,
              [credentials.username, credentials.password].join('\n')
            ),
          results.caCertificate &&
            fs.copy(
              `${dirPath}/CACertificate.crt`,
              `${appDataPath}/CACertificate.crt`
            ),
          fs.writeFile(`${appDataPath}/config.ovpn`, contents.join('\n')),
        ])
      );

      const openVpnPids: string[] = await getConnectionStatus();

      const commands = [`cd ${appDataPath}`, COMMANDS.START_VPN];

      if (openVpnPids.length) {
        commands.unshift(COMMANDS.KILL_OPVPN_PIDS);

        console.log('Some OpenVPN process detected');
        console.log('Removing it before connecting...');
      }

      try {
        executeSudoCommand(commands.join(' && '));

        setTimeout(() => {
          appState.isProcessing = false;
          appState.isConnected = true;
          sendAppState();

          setTray(mainWindow);
        }, 5000);
      } catch {
        appState.isProcessing = false;
        sendAppState();
      }
    }
  );

  ipcMain.handle(OPEN_VPN.CONNECT_TO_LAST, async (event) => {
    try {
      appState.isProcessing = true;
      sendAppState();

      connectToLastConnection();

      setTimeout(() => {
        appState.isProcessing = false;
        appState.isConnected = true;
        sendAppState();
      }, 5000);
    } catch {
      appState.isProcessing = false;
      sendAppState();
    }
  });

  ipcMain.handle(OPEN_VPN.DISCONNECT_VPN, async (event) => {
    try {
      appState.isProcessing = true;
      sendAppState();

      await disconnectAll();

      appState.isConnected = true;
      appState.isProcessing = false;
      sendAppState();
    } catch {
      appState.isProcessing = false;
      sendAppState();
    }
  });
};
