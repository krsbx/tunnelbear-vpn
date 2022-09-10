import _ from 'lodash';
import store from 'store';
import { APP_NAME } from '../constant/global';

class Storage {
  // eslint-disable-next-line no-use-before-define
  private static _instance: Storage;
  private _storage: Record<string, VPNConfig>;
  private name = APP_NAME;

  constructor() {
    const savedData = store.get(this.name);

    this._storage = {};

    if (savedData === undefined) {
      store.set(this.name, JSON.stringify(this._storage));
    } else {
      const data = JSON.parse(savedData);

      _.forEach(data, (value, key) => {
        this._storage[key] = value;
      });
    }
  }

  public static get instance() {
    if (!this._instance) this._instance = new Storage();

    return this._instance;
  }

  public get storage() {
    return this._storage;
  }

  public get(key: string) {
    return store.get(key);
  }

  public set(key: string, value: VPNConfig) {
    this._storage[key] = value;

    store.set(this.name, JSON.stringify(this.storage));

    console.log('Saved config to LocalStorage.');
  }
}

export default Storage;
