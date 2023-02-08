import { app, BrowserWindow, ipcMain } from 'electron';
import { getConnectionStatus } from '../../src/utils/common';
import { WINDOW_ACTION } from '../../src/utils/enums/ipc.window';
import { appState } from '../main';
import { setTray } from './tray';

export const setupWindowAction = async (mainWindow: BrowserWindow) => {
  ipcMain.handle(WINDOW_ACTION.RESIZE, () => {
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
  });

  ipcMain.handle(WINDOW_ACTION.MAXIMIZE, () => {
    mainWindow.maximize();
  });

  ipcMain.handle(WINDOW_ACTION.MINIMIZE, () => {
    mainWindow.minimize();
  });

  ipcMain.handle(WINDOW_ACTION.HIDE, () => {
    mainWindow.hide();
  });

  ipcMain.handle(WINDOW_ACTION.EXIT, async (event) => {
    const openVpnPids = await getConnectionStatus();

    if (!openVpnPids.length) return app.quit();

    event.preventDefault();

    if (appState.tray) return mainWindow.hide();

    setTray(mainWindow);
  });

  ipcMain.handle(WINDOW_ACTION.QUIT, () => {
    app.quit();
  });
};
