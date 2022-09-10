import { APP_NAME } from '../constant/global';

declare global {
  import Promise from 'bluebird';
  import childProcess from 'child_process';
  import fs from 'fs-extra';
  import getPort from 'get-port';
  import Telnet from 'telnet-client';
  import util from 'util';

  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [APP_NAME]: {
      fs: fs;
      getPort: getPort;
      childProcess: childProcess;
      Promise: Promise;
      Telnet: Telnet;
      util: util;
      platform: NodeJS.Platform;
      cwd: () => string;
    };
  }
}
