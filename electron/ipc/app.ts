import { app, ipcMain } from 'electron';
import { getAppDataPath } from '../../src/utils/common';
import { APP_VARIABLE } from '../../src/utils/enums/ipc.app';

ipcMain.handle(
  APP_VARIABLE.PATH,
  (event, type: Parameters<typeof app.getPath>[0]) => {
    return app.getPath(type);
  }
);

ipcMain.handle(APP_VARIABLE.APP_PATH, (event) => {
  return app.getAppPath();
});

ipcMain.handle(APP_VARIABLE.IS_PACKAGED, (event) => {
  return app.isPackaged;
});

ipcMain.handle(APP_VARIABLE.APP_DATA, (event) => {
  return getAppDataPath();
});
