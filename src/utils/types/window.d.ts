import Promise from 'bluebird';
import childProcess from 'child_process';
import fs from 'fs-extra';
import getPort from 'get-port';
import { Telnet } from 'telnet-client';
import util from 'util';
import { APP_NAME } from '../constant/global';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [APP_NAME]: {
      fs: typeof fs;
      getPort: typeof getPort;
      childProcess: typeof childProcess;
      Promise: typeof Promise;
      Telnet: typeof Telnet;
      util: typeof util;
      platform: NodeJS.Platform;
      cwd: () => string;
      isDev: boolean;
    };
  }
}
