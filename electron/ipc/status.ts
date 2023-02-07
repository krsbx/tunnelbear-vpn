import { ipcMain } from 'electron';
import { STATUS } from '../../src/utils/enums/ipc.status';
import { appState } from '../main';

ipcMain.handle(STATUS.CONNECTED, () => {
  return appState.isConnected;
});

ipcMain.handle(STATUS.PROCESSING, () => {
  return appState.isConnected;
});
