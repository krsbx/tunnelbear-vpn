import _ from 'lodash';
import {
  AppReducer,
  AppReducerActionType as ActionType,
  ResetAppReducer,
  SetAppReducer,
} from './types';

const initialState: AppReducer = {
  isConnected: false,
  isProcessing: false,
  vpns: {} as Record<string, Tunnelbear.VpnConfig>,
};

const reducer = (
  state = _.cloneDeep(initialState),
  actions: SetAppReducer | ResetAppReducer
): AppReducer => {
  switch (actions.type) {
    case ActionType.SET: {
      if (typeof actions.payload === 'function') {
        return {
          ...state,
          ...actions.payload(state),
        };
      }

      return {
        ...state,
        ...actions.payload,
      };
    }

    case ActionType.RESET: {
      return _.cloneDeep(initialState);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
