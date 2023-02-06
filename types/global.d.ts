import { ipcRenderer } from 'electron';
import { APP_NAME } from '../utils/constant';

declare global {
  interface Window {
    [APP_NAME]: {};
    ipcRenderer: typeof ipcRenderer;
  }

  type KeyOf<T> = keyof T;
  type ValueOf<T> = T[KeyOf<T>];
}

export {};
