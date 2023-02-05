import { ipcMain } from 'electron';
import fs from 'fs-extra';
import _ from 'lodash';
import { READ_WRITE } from '../../src/utils/enums/ipc.read-write';

ipcMain.handle(
  READ_WRITE.READ_FILE,
  (event, filePath: string, encoding: BufferEncoding = 'utf-8') => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          reject(err);

          return;
        }

        resolve(data);
      });
    });
  }
);

ipcMain.handle(READ_WRITE.READ_JSON_FILE, (event, filePath: string) => {
  return fs.readJson(filePath);
});

ipcMain.handle(
  READ_WRITE.WRITE_FILE,
  (event, filePath: string, content: string) => {
    return fs.writeFile(filePath, content);
  }
);

ipcMain.handle(READ_WRITE.EXISTS, (event, filePath: string) => {
  return fs.existsSync(filePath);
});

ipcMain.handle(READ_WRITE.COPY, (event, filePath, destPath) => {
  return fs.copy(filePath, destPath);
});

ipcMain.handle(READ_WRITE.MOVE, (event, filePath, destPath) => {
  return fs.move(filePath, destPath);
});
