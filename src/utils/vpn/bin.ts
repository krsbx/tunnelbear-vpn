import _ from 'lodash';
import { APP_NAME } from '../constant/global';

const { childProcess, fs, getPort, cwd, platform } = window[APP_NAME];

export async function shutdown() {
  return true;
}

function setArgsUpDown(option: AnyRecord, args: unknown[]) {
  if (option.up) args.push('--up', option.up);
  if (option.down) args.push('--down', option.down);
}

function setConfigPath(newArgs: AnyRecord, args: AnyRecord) {
  if (String(newArgs.config).includes('/')) {
    const path = String(args.config).split('/');

    let fileName = path.pop();

    if (fileName.includes('.ovpn')) fileName = fileName.replaceAll(' ', '\\ ');

    // eslint-disable-next-line no-param-reassign
    newArgs.config = _.concat(path, fileName).join('/');
  }
}

function getSetArgs(args: AnyRecord) {
  const newArgs: AnyRecord = _.defaults(_.cloneDeep(args), {
    host: '127.0.0.1',
    // port should *always* be set at this point but we will
    // defualt it anyway to 1337 just incase.
    port: 1337,
    scriptSecurity: 2,
    cwd: cwd(),
    up: false,
    down: false,
    ...(platform !== 'linux' && {
      config: 'config.ovpn',
    }),
  });

  switch (platform) {
    case 'win32':
      return [
        '--management',
        newArgs.host,
        newArgs.port,
        '--config',
        newArgs.config,
        '--script-security',
        newArgs.scriptSecurity,
        '--management-query-passwords',
        '--management-hold',
        '--register-dns',
      ];

    case 'darwin': {
      const arg = [
        '--management',
        newArgs.host,
        newArgs.port,
        '--config',
        newArgs.config,
        '--script-security',
        newArgs.scriptSecurity,
        '--management-query-passwords',
        '--management-hold',
        '--daemon',
      ];

      setArgsUpDown(newArgs, arg);

      return arg;
    }
    case 'linux': {
      setConfigPath(newArgs, args);

      const arg = [
        '--management',
        newArgs.host,
        newArgs.port,
        '--config',
        newArgs.config,
        '--script-security',
        newArgs.scriptSecurity,
        '--management-query-passwords',
        '--management-hold',
        '--daemon',
        '--dev',
        'tun0',
      ];

      setArgsUpDown(newArgs, arg);

      return arg;
    }
    default:
      throw new Error('Unsupported platform');
  }
}

export async function initialize(openvpnpath: string, args: AnyRecord) {
  const exists = fs.existsSync(String(args.config));

  if (!exists) console.info('OpenVpn Config file not found, defaulting to "config.ovpn"');

  const newArgs = getSetArgs(
    !args.port
      ? {
          ...args,
          port: await getPort(),
        }
      : args
  );

  childProcess.execFileSync(openvpnpath, newArgs as string[]);

  return {
    port: args.port,
    host: args.host,
  };
}
