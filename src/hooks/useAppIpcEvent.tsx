import { app } from 'electron';
import { useCallback } from 'react';
import { APP_VARIABLE } from '../utils/enums/ipc.app';

const useAppIpcEvent = () => {
  const getAppPath = useCallback(() => {
    return window.ipcRenderer.invoke(APP_VARIABLE.APP_PATH) as Promise<string>;
  }, []);

  const getPath = useCallback((type: Parameters<typeof app.getPath>[0]) => {
    return window.ipcRenderer.invoke(
      APP_VARIABLE.PATH,
      type
    ) as Promise<string>;
  }, []);

  const getAppDataPath = useCallback(() => {
    return window.ipcRenderer.invoke(APP_VARIABLE.APP_DATA) as Promise<string>;
  }, []);

  const getIsPackaged = useCallback(() => {
    return window.ipcRenderer.invoke(
      APP_VARIABLE.IS_PACKAGED
    ) as Promise<boolean>;
  }, []);

  return {
    getAppPath,
    getPath,
    getIsPackaged,
    getAppDataPath,
  };
};

export default useAppIpcEvent;
