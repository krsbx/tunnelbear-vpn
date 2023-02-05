import { dialog, ipcMain } from 'electron';
import { SHOW_DIALOG } from '../../src/utils/enums/ipc.dialog';

ipcMain.handle(SHOW_DIALOG.SAVE, async (event, defaultPath?: string) => {
  try {
    return dialog.showSaveDialog({
      title: 'Save File...',
      buttonLabel: 'Save',
      defaultPath,
    });
  } catch {
    dialog.showErrorBox(
      'Failed to open Browser',
      'Failed to open the file browser/explorer'
    );
  }
});

ipcMain.handle(
  SHOW_DIALOG.OPEN,
  async (
    event,
    {
      properties = [],
      defaultPath,
    }: {
      properties: Electron.OpenDialogOptions['properties'];
      defaultPath?: string;
    }
  ) => {
    try {
      return dialog.showOpenDialog({
        title: 'Open File...',
        buttonLabel: 'Open',
        properties,
        defaultPath,
      });
    } catch {
      dialog.showErrorBox(
        'Failed to open Browser',
        'Failed to open the file browser/explorer'
      );
    }
  }
);

ipcMain.handle(
  SHOW_DIALOG.MESSAGE,
  async (event, options: Electron.MessageBoxOptions) => {
    try {
      return dialog.showMessageBox(options);
    } catch {}
  }
);

ipcMain.handle(
  SHOW_DIALOG.ERROR,
  async (event, { title, content }: { title: string; content: string }) => {
    try {
      dialog.showErrorBox(title, content);
    } catch {}
  }
);
