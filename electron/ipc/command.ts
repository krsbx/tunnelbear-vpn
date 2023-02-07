import { ipcMain } from 'electron';
import {
  execAsync,
  executeSudoCommand,
  modifyContent,
} from '../../src/utils/common';
import { COMMAND_ACTION } from '../../src/utils/enums/ipc.command';

ipcMain.handle(COMMAND_ACTION.SUDO_EXECUTE, (event, command: string) => {
  return executeSudoCommand(command);
});

ipcMain.handle(COMMAND_ACTION.EXECUTE, (event, command: string) => {
  return execAsync(command);
});

ipcMain.handle(
  COMMAND_ACTION.MODIFY_CONFIG,
  (event, contents: string[], credentials: unknown) => {
    return modifyContent(contents, credentials);
  }
);
