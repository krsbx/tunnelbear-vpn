import _ from 'lodash';
import { useCallback } from 'react';
import store from 'store';
import { COMMANDS, CREDENTIALS } from '../utils/constant';
import { OPEN_VPN } from '../utils/enums/ipc.openvpn';
import useCommandIpcEvent from './useCommandIpcEvent';

const useOpenVpn = () => {
  const { executeSudoCommand } = useCommandIpcEvent();

  const disconnectOpenVpn = useCallback(
    () => executeSudoCommand(COMMANDS.KILL_OPVPN_PIDS),
    []
  );

  const connectOpenVpn = useCallback(
    async (dirPath: string, contents: string[]) => {
      const credentials = JSON.parse(store.get(CREDENTIALS.CREDENTIALS, {}));

      return window.ipcRenderer.invoke(
        OPEN_VPN.CONNECT_VPN,
        dirPath,
        credentials,
        contents
      ) as Promise<void>;
    },
    []
  );

  return {
    connectOpenVpn,
    disconnectOpenVpn,
  };
};

export default useOpenVpn;
