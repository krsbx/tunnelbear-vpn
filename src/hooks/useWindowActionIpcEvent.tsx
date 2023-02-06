import { useCallback } from 'react';
import { WINDOW_ACTION } from '../utils/enums/ipc.window';

const useWindowActionIpcEvent = () => {
  const maximizeWindow = useCallback(() => {
    window.ipcRenderer.invoke(WINDOW_ACTION.MAXIMIZE);
  }, []);

  const minimizeWindow = useCallback(() => {
    window.ipcRenderer.invoke(WINDOW_ACTION.MINIMIZE);
  }, []);

  const resizeWindow = useCallback(() => {
    window.ipcRenderer.invoke(WINDOW_ACTION.RESIZE);
  }, []);

  const closeApp = useCallback(() => {
    window.ipcRenderer.invoke(WINDOW_ACTION.QUIT);
  }, []);

  return {
    maximizeWindow,
    minimizeWindow,
    resizeWindow,
    closeApp,
  };
};

export default useWindowActionIpcEvent;
