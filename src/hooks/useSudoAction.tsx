import { useCallback } from 'react';
import { execAsync } from '../utils/common';
import { COMMAND_ACTION } from '../utils/enums/ipc.command';

const useCommandIpcEvent = () => {
  const executeSudoCommand = useCallback((command: string) => {
    return window.ipcRenderer.invoke(
      COMMAND_ACTION.SUDO_EXECUTE,
      command
    ) as Promise<void>;
  }, []);

  const executeCommand = useCallback((command: string) => {
    return window.ipcRenderer.invoke(
      COMMAND_ACTION.EXECUTE,
      command
    ) as Promise<ReturnType<typeof execAsync>>;
  }, []);

  return { executeSudoCommand, executeCommand };
};

export default useCommandIpcEvent;
