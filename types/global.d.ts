import { ipcRenderer } from 'electron';
import { decrypt, encrypt } from '../src/crypto';
import { APP_NAME } from '../utils/constant';

declare global {
  interface Window {
    [APP_NAME]: {};
    ipcRenderer: typeof ipcRenderer;
    encrypt: typeof encrypt;
    decrypt: typeof decrypt;
  }

  type KeyOf<T> = keyof T;
  type ValueOf<T> = T[KeyOf<T>];
}

export {};
