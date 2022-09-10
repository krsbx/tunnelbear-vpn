import _ from 'lodash';
import * as openvpnbin from './bin';
import * as openvpnmanager from './openvpn';

class VPN {
  // eslint-disable-next-line no-use-before-define
  private static _instance: VPN;

  public static get instance() {
    if (!this._instance) this._instance = new VPN();

    return this._instance;
  }

  public connect(
    path: string,
    credentials: {
      username: string;
      password: string;
    }
  ) {
    openvpnbin
      .initialize('openvpn', {
        host: '127.0.0.1',
        port: 1337,
        config: path,
      })
      .then(() => {
        const managerInstance = openvpnmanager.connect({ host: '127.0.0.1', port: 1337 });
        if (_.isBoolean(managerInstance)) return;

        managerInstance.on('connected', () => {
          openvpnmanager.authorize({
            user: credentials.username,
            pass: credentials.password,
          });
        });

        managerInstance.on('console-output', (output: AnyRecord) => {
          console.log(output);
        });
      });
  }

  public disconnect() {
    openvpnbin.shutdown().then(() => {
      openvpnmanager.disconnect().then(openvpnmanager.destroy);
    });
  }
}

export default VPN;
