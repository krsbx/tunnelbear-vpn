import { app, BrowserWindow, Menu, Tray } from 'electron';
import path from 'path';
import {
  connectToLastConnection,
  disconnectAll,
  getConnectionStatus,
} from '../../src/utils/common';
import { appState } from '../main';

export const setTray = async (mainWindow: BrowserWindow) => {
  const isPackaged = app.isPackaged;
  const iconPath = isPackaged
    ? path.join(
        path.parse(path.resolve(app.getPath('exe'))).dir,
        'files/icon.png'
      )
    : path.join(app.getAppPath(), 'electron/files/icon.png');

  appState.tray = new Tray(iconPath);

  const openVpnPids = await getConnectionStatus();
  const isConnected = openVpnPids.length && openVpnPids.length > 0;

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Tunnelbear VPN',
      enabled: false,
    },
    {
      type: 'separator',
    },
    {
      label: 'Show App',
      click: () => mainWindow.show(),
    },
    {
      label: !isConnected ? 'Connect' : 'Disconnect',
      click: () => (!isConnected ? connectToLastConnection() : disconnectAll()),
    },
    {
      label: 'Quit',
      click: async () => {
        await disconnectAll();

        mainWindow.close();
      },
    },
  ]);

  appState.tray.setContextMenu(contextMenu);

  mainWindow.hide();
};

export const setupTray = (mainWindow: BrowserWindow) => {
  mainWindow.on('minimize', () => {
    if (appState.tray) return mainWindow.hide();

    setTray(mainWindow);
  });

  mainWindow.on('restore', () => {
    if (!appState.tray) return;

    appState.tray.destroy();
    appState.tray = null;
  });
};
