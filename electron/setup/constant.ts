import { app } from 'electron';
import path from 'path';

export const iconPath = app.isPackaged
  ? path.join(
      path.parse(path.resolve(app.getPath('exe'))).dir,
      'files/icon.png'
    )
  : path.join(app.getAppPath(), 'electron/files/icon.png');
