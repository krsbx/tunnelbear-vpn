import { useCallback } from 'react';
import { SHOW_DIALOG } from '../utils/enums/ipc.dialog';

const useDialogIpcEvent = () => {
  const showSaveDialog = useCallback((defaultPath?: string) => {
    return window.ipcRenderer.invoke(
      SHOW_DIALOG.SAVE,
      defaultPath
    ) as Promise<Electron.SaveDialogReturnValue>;
  }, []);

  const showOpenDialog = useCallback(
    ({
      properties = [],
      defaultPath = undefined,
    }: {
      properties: Electron.OpenDialogOptions['properties'];
      defaultPath?: string;
    }) => {
      return window.ipcRenderer.invoke(SHOW_DIALOG.OPEN, {
        properties,
        defaultPath,
      }) as Promise<Electron.OpenDialogReturnValue>;
    },
    []
  );

  const showMessageDialogBox = useCallback(
    (options: Electron.MessageBoxOptions) => {
      return window.ipcRenderer.invoke(
        SHOW_DIALOG.MESSAGE,
        options
      ) as Promise<Electron.MessageBoxReturnValue>;
    },
    []
  );

  const showErrorDialogBox = useCallback(
    (options: { title: string; content: string }) => {
      window.ipcRenderer.invoke(SHOW_DIALOG.ERROR, options);
    },
    []
  );

  return {
    showSaveDialog,
    showOpenDialog,
    showMessageDialogBox,
    showErrorDialogBox,
  };
};

export default useDialogIpcEvent;
