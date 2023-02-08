export type AppReducer = {
  isConnected: boolean;
  isProcessing: boolean;
  vpns: Record<string, Tunnelbear.VpnConfig>;
};

export enum AppReducerActionType {
  SET = 'app.reducer.set',
  RESET = 'app.reducer.reset',
}

export type SetAppReducer = {
  type: AppReducerActionType.SET;
  payload: Partial<AppReducer> | ((prev: AppReducer) => Partial<AppReducer>);
};

export type ResetAppReducer = {
  type: AppReducerActionType.RESET;
};
