import _ from 'lodash';
import { useCallback } from 'react';
import store from 'store';
import { COMMANDS, CREDENTIALS } from '../utils/constant';
import { COMMAND_ACTION } from '../utils/enums/ipc.command';
import useAppIpcEvent from './useAppIpcEvent';
import useReadWriteIpcEvent from './useReadWriteIpcEvent';
import useSudoAction from './useSudoAction';

const useOpenVpn = () => {
  const { getAppDataPath } = useAppIpcEvent();
  const { copy, writeFile } = useReadWriteIpcEvent();
  const { executeSudoCommand, executeCommand } = useSudoAction();

  const modifyConfig = useCallback((contents: string[]) => {
    return window.ipcRenderer.invoke(
      COMMAND_ACTION.MODIFY_CONFIG,
      contents,
      store.get(CREDENTIALS.CREDENTIALS, {})
    ) as Promise<{
      credentials: Tunnelbear.Schema['Credential'];
      caCertificate: boolean;
      userCertificate: boolean;
    }>;
  }, []);

  const disconnectOpenVpn = useCallback(
    () => executeSudoCommand(COMMANDS.KILL_OPVPN_PIDS),
    []
  );

  const connectOpenVpn = useCallback(
    async (dirPath: string, contents: string[]) => {
      const appDataPath = await getAppDataPath();
      const results = await modifyConfig(contents);

      await Promise.all(
        _.compact([
          !_.isEmpty(results.credentials) &&
            writeFile(
              `${appDataPath}/credentials.conf`,
              [results.credentials.username, results.credentials.password].join(
                '\n'
              )
            ),
          results.caCertificate &&
            copy(
              `${dirPath}/CACertificate.crt`,
              `${appDataPath}/CACertificate.crt`
            ),
          results.userCertificate &&
            copy(
              `${dirPath}/UserCertificate.crt`,
              `${appDataPath}/UserCertificate.crt`
            ),
          results.userCertificate &&
            copy(`${dirPath}/PrivateKey.key`, `${appDataPath}/PrivateKey.key`),
          writeFile(`${appDataPath}/config.ovpn`, contents.join('\n')),
        ])
      );

      const openVpnPids = (
        (await executeCommand(COMMANDS.GET_OVPN_PIDS)).stdout as string
      ).split('\n');

      const commands = [`cd ${appDataPath}`, COMMANDS.START_VPN];

      if (openVpnPids.length) commands.unshift(COMMANDS.KILL_OPVPN_PIDS);

      await executeSudoCommand(commands.join(' && '));
    },
    []
  );

  return {
    connectOpenVpn,
    disconnectOpenVpn,
  };
};

export default useOpenVpn;
