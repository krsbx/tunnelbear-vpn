export const APP_NAME = 'Tunnelbear' as const;

export const CREDENTIALS = {
  CREDENTIALS: 'credentials',
  USERNAME: 'username',
  PASSWORD: 'password',
  CONFIRMATION: 'confirmation',
} as const;

export enum Platform {
  WINDOWS = 'win32',
  MAC = 'darwin',
  LINUX = 'linux',
  SUN = 'sunos',
  OPENBSD = 'openbsd',
  ANDROID = 'android',
  AIX = 'aix',
}

export const COMMANDS = {
  GET_OVPN_PIDS: 'pgrep openvpn',
  get KILL_OPVPN_PIDS() {
    return `${this.GET_OVPN_PIDS} | xargs sudo kill -9`;
  },
  START_VPN: 'openvpn --config config.ovpn',
};
