/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EventEmitter } from 'events';
import _ from 'lodash';
import { APP_NAME } from '../constant/global';

const { Promise, Telnet, util } = window[APP_NAME];

let openvpnEmitter: EventEmitter | boolean = false;
let connection: EventEmitter | boolean = false;

export const destroy = () => {
  if (connection && connection instanceof EventEmitter) {
    connection.removeAllListeners();
    // @ts-ignore
    connection.end();
    // @ts-ignore
    connection.destroy();
    connection = false;
  }
};

export const connect = (params: AnyRecord) => {
  establishConnection(params)
    .then(OpenVPNLog)
    .then(() => OpenVPNManagement('pid'))
    .then(() => OpenVPNManagement('bytecount 1'))
    .then(() => OpenVPNManagement('hold release'))
    .then(() => {
      if (!_.isBoolean(openvpnEmitter)) openvpnEmitter.emit('connected');
    });

  return openvpnEmitter;
};

export const connectAndKill = (params: AnyRecord) => {
  establishConnection(params).then(OpenVPNLog).then(disconnectOpenVPN);

  return openvpnEmitter;
};

export const authorize = (auth: { user: string; pass: string }) =>
  OpenVPNManagement(util.format('username "Auth" "%s"', auth.user)).then(() => {
    OpenVPNManagement(util.format('password "Auth" "%s"', auth.pass));
  });

export const disconnect = () => disconnectOpenVPN();

export const cmd = (command: string) => OpenVPNManagement(command);

function establishConnection(params: AnyRecord) {
  connection = new Telnet();
  openvpnEmitter = new EventEmitter();

  if (connection instanceof EventEmitter) {
    connection.on('end', () => {
      if (openvpnEmitter instanceof EventEmitter) openvpnEmitter.emit('end');
    });

    connection.on('close', () => {
      if (openvpnEmitter instanceof EventEmitter) openvpnEmitter.emit('close');
    });

    connection.on('error', (error) => {
      console.log(error);

      if (openvpnEmitter instanceof EventEmitter) openvpnEmitter.emit('error', error);
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return new Promise((resolve: Function) => {
    // eslint-disable-next-line no-param-reassign
    params = _.defaults(params, {
      host: '127.0.0.1',
      port: 1337,
      shellPrompt: '',
      timeout: 2,
    });

    // @ts-ignore
    resolve((connection as EventEmitter).connect(params));
  });
}

function disconnectOpenVPN() {
  return OpenVPNManagement('signal SIGTERM');
}

function OpenVPNManagement(command: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return new Promise((resolve: Function) => {
    setTimeout(() => {
      // @ts-ignore
      if (connection) resolve(connection.exec(command));
    }, 1000);
  });
}

function OpenVPNLog() {
  // @ts-ignore
  connection.exec('log on all', () => {
    // @ts-ignore
    connection.exec('state on', () => {
      if (connection instanceof EventEmitter)
        connection.on('console-output', (response: string) => {
          _.each(response.split('\n'), (res) => {
            if (openvpnEmitter instanceof EventEmitter)
              if (res && res.substr(1, 5) === 'STATE') {
                openvpnEmitter.emit('state-change', res.substr(7).split(','));
              } else if (res && res.substr(1, 4) === 'HOLD') {
                openvpnEmitter.emit('hold-waiting');
              } else if (
                (res && res.substr(1, 5) === 'FATAL') ||
                (res && res.substr(1, 5) === 'ERROR')
              ) {
                openvpnEmitter.emit('error', res.substr(7));
              } else if (res && res.substr(1, 9) === 'BYTECOUNT') {
                openvpnEmitter.emit('bytecount', res.substr(11).split(','));
              } else if (res && res.substr(0, 7) === 'SUCCESS') {
                if (res.substr(9, 3) === 'pid') {
                  openvpnEmitter.emit('pid', res.substr(13));
                }
              } else if (res.length > 0) {
                openvpnEmitter.emit('console-output', res);
              }
          });
        });
    });
  });
}
