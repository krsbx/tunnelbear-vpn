import _ from 'lodash';
import { useCallback } from 'react';
import store from 'store';
import crypto from '../crypto';
import { CREDENTIALS } from '../utils/constant';
import { OPEN_VPN } from '../utils/enums/ipc.openvpn';

const useOpenVpn = () => {
  const disconnectOpenVpn = useCallback(() => {
    return window.ipcRenderer.invoke(OPEN_VPN.DISCONNECT_VPN);
  }, []);

  const connectOpenVpnLastConnection = useCallback(() => {
    return window.ipcRenderer.invoke(OPEN_VPN.CONNECT_TO_LAST);
  }, []);

  const connectOpenVpn = useCallback(
    async (dirPath: string, contents: string[]) => {
      const credentials: Tunnelbear.Schema['Credential'] = JSON.parse(
        store.get(CREDENTIALS.CREDENTIALS, {})
      );

      return window.ipcRenderer.invoke(
        OPEN_VPN.CONNECT_VPN,
        dirPath,
        {
          username: crypto.decrypt(credentials.username),
          password: crypto.decrypt(credentials.password),
        },
        contents
      ) as Promise<void>;
    },
    []
  );

  return {
    connectOpenVpn,
    connectOpenVpnLastConnection,
    disconnectOpenVpn,
  };
};

export default useOpenVpn;
