import { BrowserWindow, ipcMain, Notification } from 'electron';
import _ from 'lodash';
import {
  connectToLastConnection,
  disconnectAll,
  modifyContent,
  writeConfigFiles,
} from '../../src/utils/common';
import { OPEN_VPN } from '../../src/utils/enums/ipc.openvpn';
import Tunnelbear from '../../types/tunnelbear';
import { appState } from '../main';
import { iconPath } from './constant';
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

      const { results } = modifyContent(contents, credentials);

      await writeConfigFiles(
        {
          contents,
          results,
        },
        dirPath
      );

      try {
        connectToLastConnection();

        setTimeout(() => {
          appState.isProcessing = false;
          appState.isConnected = true;
          sendAppState();

          const notification = new Notification({
            title: 'Connected',
            body: 'Connected to selected server, you are protected by the bear',
            icon: iconPath,
          });

          notification.show();

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

        const notification = new Notification({
          title: 'Connected',
          body: 'Connected to last connection, you are protected by the bear',
          icon: iconPath,
        });

        notification.show();
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

      const notification = new Notification({
        title: 'Disconnected',
        body: 'Disconnected, you are not protected by the bear',
        icon: iconPath,
      });

      notification.show();
    } catch {
      appState.isProcessing = false;
      sendAppState();
    }
  });
};
