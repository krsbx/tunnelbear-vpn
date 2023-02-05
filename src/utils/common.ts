import { exec } from 'child_process';
import { app } from 'electron';
import os from 'os';
import path from 'path';
import { promisify } from 'util';
import { APP_NAME, Platform } from './constant';

export const getAppDataPath = () => {
  switch (os.platform()) {
    case Platform.WINDOWS:
      return path.join(app.getPath('appData'), APP_NAME);

    case Platform.MAC:
    case Platform.LINUX:
      return path.join(app.getPath('home'), `.local/share/${APP_NAME}`);

    default:
      return app.getAppPath();
  }
};

export const execAsync = promisify(exec);
