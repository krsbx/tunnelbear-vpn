import { contextBridge, ipcRenderer } from 'electron';
import { decrypt, encrypt } from '../src/crypto';

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

contextBridge.exposeInMainWorld('ipcRenderer', {
  ...ipcRenderer,
  on: ipcRenderer.on.bind(ipcRenderer),
});
contextBridge.exposeInMainWorld('encrypt', encrypt);
contextBridge.exposeInMainWorld('decrypt', decrypt);
