import React from 'react';
import { AppReducer, ResetAppReducer, SetAppReducer } from '../provider/types';

type ContextType = {
  state: AppReducer;
  dispatch: React.Dispatch<SetAppReducer | ResetAppReducer>;
};

const AppContext = React.createContext<ContextType>({} as ContextType);

export default AppContext;
