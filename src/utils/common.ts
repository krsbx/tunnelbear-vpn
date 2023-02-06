import sudo from '@vscode/sudo-prompt';
import { exec } from 'child_process';
import { app } from 'electron';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';
import { APP_NAME, COMMANDS, Platform } from './constant';

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

export const executeSudoCommand = (command: string) =>
  sudo.exec(
    command,
    {
      name: APP_NAME,
    },
    (err, stdout, stderr) => {
      console.log({ err, stdout, stderr });
    }
  );

export const executeCommand = (command: string) => execAsync(command);

export const connectToLastConnection = async () => {
  const openVpnPids: string[] = [];

  if (!fs.existsSync(path.join(getAppDataPath(), 'config.ovpn'))) return;

  try {
    openVpnPids.concat(
      ((await executeCommand(COMMANDS.GET_OVPN_PIDS)).stdout as string).split(
        '\n'
      )
    );
  } catch {}

  const commands = [`cd ${getAppDataPath()}`, COMMANDS.START_VPN];

  if (openVpnPids.length) commands.unshift(COMMANDS.KILL_OPVPN_PIDS);

  return executeSudoCommand(commands.join(' && '));
};

export const disconnectAll = async () => {
  const openVpnPids: string[] = [];

  try {
    openVpnPids.concat(
      ((await executeCommand(COMMANDS.GET_OVPN_PIDS)).stdout as string).split(
        '\n'
      )
    );
  } catch {}

  if (openVpnPids.length) return executeSudoCommand(COMMANDS.KILL_OPVPN_PIDS);
};
