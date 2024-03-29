import { BrowserWindow, Menu, shell, Tray } from 'electron';
import {
  connectToLastConnection,
  disconnectAll,
  getConnectionStatus,
} from '../../src/utils/common';
import { appState } from '../main';
import { iconPath } from './constant';

export const setTray = async (mainWindow: BrowserWindow) => {
  if (!appState.tray) appState.tray = new Tray(iconPath);

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
      click: () => {
        if (isConnected) {
          disconnectAll();
          return;
        }

        connectToLastConnection();
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Report App Issue',
      click: () =>
        shell.openExternal('https://github.com/krsbx/tunnelbear-vpn/issues'),
    },
    {
      label: 'Report Tunnelbear Issue',
      click: () => shell.openExternal('https://help.tunnelbear.com/hc/en-us'),
    },
    {
      type: 'separator',
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

  mainWindow.on('restore', async () => {
    const openVpnPids = await getConnectionStatus();
    const isConnected = openVpnPids.length && openVpnPids.length > 0;

    if (!appState.tray || isConnected) return;

    appState.tray.destroy();
    appState.tray = null;
  });
};
