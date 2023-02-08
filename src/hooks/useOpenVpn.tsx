import _ from 'lodash';
import { useCallback } from 'react';
import store from 'store';
import { CREDENTIALS } from '../utils/constant';
import { OPEN_VPN } from '../utils/enums/ipc.openvpn';

const useOpenVpn = () => {
  const disconnectOpenVpn = useCallback(() => {
    return window.ipcRenderer.invoke(OPEN_VPN.DISCONNECT_VPN);
  }, []);

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
