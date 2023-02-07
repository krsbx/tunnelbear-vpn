import { ipcMain } from 'electron';
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

ipcMain.handle(
  OPEN_VPN.CONNECT_VPN,
  async (
    event,
    dirPath: string,
    credentials: Tunnelbear.Schema['Credential'],
    contents: string[]
  ) => {
    appState.isProcessing = true;
    ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));

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
      await executeSudoCommand(commands.join(' && '));

      appState.isConnected = true;
      ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));
    } catch {
      appState.isProcessing = false;
      ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));
    }
  }
);

ipcMain.handle(OPEN_VPN.CONNECT_TO_LAST, async (event) => {
  try {
    appState.isProcessing = true;
    ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));

    await connectToLastConnection();

    appState.isConnected = true;
    ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));
  } catch {
    appState.isProcessing = false;
    ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));
  }
});

ipcMain.handle(OPEN_VPN.DISCONNECT_VPN, async (event) => {
  try {
    appState.isProcessing = true;
    ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));

    await disconnectAll();

    appState.isConnected = true;
    ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));
  } catch {
    appState.isProcessing = false;
    ipcMain.emit(OPEN_VPN.OPEN_VPN_EVENT, _.omit(appState, ['tray']));
  }
});
