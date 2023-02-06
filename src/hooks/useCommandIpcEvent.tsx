import { useCallback } from 'react';
import { execAsync } from '../utils/common';
import { COMMAND_ACTION } from '../utils/enums/ipc.command';

const useCommandIpcEvent = () => {
  const executeSudoCommand = useCallback((command: string) => {
    return window.ipcRenderer.invoke(
      COMMAND_ACTION.SUDO_EXECUTE,
      command
    ) as Promise<{
      err?: Error;
      stdout?: string | Buffer;
      stderr?: string | Buffer;
    }>;
  }, []);

  const executeCommand = useCallback(async (command: string) => {
    try {
      return window.ipcRenderer.invoke(
        COMMAND_ACTION.EXECUTE,
        command
      ) as Promise<ReturnType<typeof execAsync>>;
    } catch (err) {
      return {
        stderr: err,
        stdout: undefined,
      };
    }
  }, []);

  return { executeSudoCommand, executeCommand };
};

export default useCommandIpcEvent;
