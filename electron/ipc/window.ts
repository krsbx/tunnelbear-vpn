import { BrowserWindow, ipcMain } from 'electron';
import { WINDOW_ACTION } from '../../src/utils/enums/ipc.window';

export const setupWindowAction = async (win: BrowserWindow) => {
  ipcMain.handle(WINDOW_ACTION.RESIZE, () => {
    win.isMaximized() ? win.restore() : win.maximize();
  });

  ipcMain.handle(WINDOW_ACTION.MAXIMIZE, () => {
    win.maximize();
  });

  ipcMain.handle(WINDOW_ACTION.MINIMIZE, () => {
    win.minimize();
  });

  ipcMain.handle(WINDOW_ACTION.HIDE, () => {
    win.hide();
  });

  ipcMain.handle(WINDOW_ACTION.EXIT, () => {
    win.close();
  });

  ipcMain.handle(WINDOW_ACTION.QUIT, () => {
    win.close();
  });
};
