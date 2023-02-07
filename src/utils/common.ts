import { exec } from 'child_process';
import { app } from 'electron';
import fs from 'fs';
import _ from 'lodash';
import os from 'os';
import path from 'path';
import sudo from 'sudo-prompt';
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
  new Promise<{
    err?: Error;
    stdout?: string | Buffer;
    stderr?: string | Buffer;
  }>((resolve) => {
    sudo.exec(
      command,
      {
        name: APP_NAME,
      },
      (err, stdout, stderr) => {
        resolve({ err, stdout, stderr });
      }
    );
  });

export const executeCommand = (command: string) => execAsync(command);

export const modifyContent = (contents: string[], credentials: unknown) => {
  const results = {
    credentials: {
      username: '',
      password: '',
    },
    caCertificate: false,
  };

  const credIndex = contents.findIndex((str) => str.includes('auth-user-pass'));

  if (credIndex !== -1) {
    contents[credIndex] = 'auth-user-pass credentials.conf';

    results.credentials = credentials as typeof results['credentials'];
  }

  const caCertIndex = contents.findIndex((str) =>
    str.includes('ca CACertificate.crt')
  );

  if (caCertIndex !== -1) results.caCertificate = true;

  const userCertIndex = contents.findIndex((str) =>
    str.includes('cert UserCertificate.crt')
  );

  if (userCertIndex !== -1) contents.splice(userCertIndex, 1);

  return {
    results,
    contents,
  };
};

export const getConnectionStatus = async () => {
  const openVpnPids: string[] = [];

  try {
    console.log('Getting all OpenVPN process...');

    const { stdout } = await executeCommand(COMMANDS.GET_OVPN_PIDS);

    const pIds = _.compact((stdout as string).split('\n'));

    if (pIds.length) openVpnPids.push(...pIds);
  } catch {
    console.log('No any OpenVPN process are running...');
  }

  return openVpnPids;
};

export const connectToLastConnection = async () => {
  if (!fs.existsSync(path.join(getAppDataPath(), 'config.ovpn'))) return;

  const openVpnPids: string[] = await getConnectionStatus();

  const commands = [`cd ${getAppDataPath()}`, COMMANDS.START_VPN];

  if (openVpnPids.length) {
    commands.unshift(COMMANDS.KILL_OPVPN_PIDS);

    console.log('Some OpenVPN process detected');
    console.log('Removing it before connecting...');
  }

  return executeSudoCommand(commands.join(' && '));
};

export const disconnectAll = async () => {
  const openVpnPids: string[] = await getConnectionStatus();

  if (!openVpnPids.length) return;

  executeSudoCommand(COMMANDS.KILL_OPVPN_PIDS);
};
