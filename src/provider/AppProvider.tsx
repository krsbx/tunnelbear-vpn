import _ from 'lodash';
import React, { useReducer } from 'react';
import AppContext from '../context/AppContext';
import reducer from './reducer';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    isConnected: false,
    isProcessing: false,
    vpns: {},
  });

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
