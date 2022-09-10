import Promise from 'bluebird';
import childProcess from 'child_process';
import { contextBridge } from 'electron';
import fs from 'fs-extra';
import getPort from 'get-port';
import Telnet from 'telnet-client';
import util from 'util';
import { APP_NAME } from '../utils/constant/global';

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

contextBridge.exposeInMainWorld(APP_NAME, {
  fs,
  getPort,
  childProcess,
  Promise,
  Telnet,
  util,
  platform: process.platform,
  cwd: process.cwd,
});
