import { useEffect } from 'react';
import { AppReducerActionType } from '../provider/types';
import { OPEN_VPN } from '../utils/enums/ipc.openvpn';
import useAppContext from './useAppContext';

const useAppStateListener = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    window.ipcRenderer.on(
      OPEN_VPN.OPEN_VPN_EVENT,
      (event, args: Omit<Tunnelbear.AppState, 'tray'>) => {
        dispatch({
          type: AppReducerActionType.SET,
          payload: args,
        });
      }
    );
  }, []);
};

export default useAppStateListener;
