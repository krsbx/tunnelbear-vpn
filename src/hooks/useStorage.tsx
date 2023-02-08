import { AppReducerActionType as ActionType } from '../provider/types';
import Storage from '../utils/Storage';
import useAppContext from './useAppContext';

const useStorage = () => {
  const { dispatch } = useAppContext();

  const populateContext = () => {
    dispatch({
      type: ActionType.SET,
      payload: {
        vpns: Storage.instance.storage,
      },
    });
  };

  const setStorage = (key: string, value: Tunnelbear.VpnConfig) => {
    Storage.instance.set(key, value);

    populateContext();
  };

  const getStorage = (key: string) => Storage.instance.get(key);

  const deleteStorage = (key: string) => {
    Storage.instance.delete(key);

    populateContext();
  };

  return {
    setStorage,
    getStorage,
    deleteStorage,
    populateContext,
  };
};

export default useStorage;
