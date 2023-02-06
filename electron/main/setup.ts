import { BrowserWindow, clipboard, Menu, Tray } from 'electron';
import {
  connectToLastConnection,
  disconnectAll,
  executeCommand,
  executeSudoCommand,
  getAppDataPath,
} from '../../src/utils/common';
import { COMMANDS } from '../../src/utils/constant';

const setTray = (appState: Tunnelbear.AppState, mainWindow: BrowserWindow) => {
  appState.tray = new Tray(clipboard.readImage());

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
      label: 'Connect',
      click: () => connectToLastConnection(),
    },
    {
      label: 'Disconnect',
      click: () => disconnectAll(),
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

export const setupTray = (
  appState: Tunnelbear.AppState,
  mainWindow: BrowserWindow
) => {
  mainWindow.on('minimize', () => {
    if (appState.tray) return mainWindow.hide();

    setTray(appState, mainWindow);
  });

  mainWindow.on('restore', () => {
    if (!appState.tray) return;

    appState.tray.destroy();
    appState.tray = null;
  });
};
