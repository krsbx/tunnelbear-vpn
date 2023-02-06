import sudo from '@vscode/sudo-prompt';
import { ipcMain } from 'electron';
import { execAsync } from '../../src/utils/common';
import { APP_NAME, CREDENTIALS } from '../../src/utils/constant';
import { COMMAND_ACTION } from '../../src/utils/enums/ipc.command';

ipcMain.handle(COMMAND_ACTION.SUDO_EXECUTE, (event, command: string) => {
  return sudo.exec(
    command,
    {
      name: APP_NAME,
    },
    (err, stdout, stderr) => {
      console.log({ err, stdout, stderr });
    }
  );
});

ipcMain.handle(COMMAND_ACTION.EXECUTE, (event, command: string) => {
  return execAsync(command);
});

ipcMain.handle(
  COMMAND_ACTION.MODIFY_CONFIG,
  (event, contents: string[], credentials: unknown) => {
    const results = {
      credentials: {
        username: '',
        password: '',
      },
      caCertificate: false,
      userCertificate: false,
    };

    const credIndex = contents.findIndex((str) =>
      str.includes('auth-user-pass')
    );

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

    if (userCertIndex !== -1) {
      contents.splice(userCertIndex, 0, 'key PrivateKey.key');

      results.userCertificate = true;
    }

    return {
      results,
      contents,
    };
  }
);
