import _ from 'lodash';
import store from 'store';
import { APP_NAME } from './constant';

class Storage {
  private static _instance: Storage;
  private _storage: Record<string, Tunnelbear.VpnConfig> = {};
  private name = APP_NAME;

  constructor() {
    const savedData = store.get(this.name);

    this._storage = {};

    if (!savedData) {
      store.set(this.name, JSON.stringify({}));
      return;
    }

    const data = JSON.parse(savedData) as Record<string, Tunnelbear.VpnConfig>;

    _.forEach(data, (value, key) => (this._storage[key] = value));
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

  public set(key: string, value: Tunnelbear.VpnConfig) {
    this._storage[key] = value;

    store.set(this.name, JSON.stringify(this.storage));

    console.log('Saved config to LocalStorage.');
  }

  public delete(key: string) {
    delete this.storage[key];

    store.set(this.name, JSON.stringify(this.storage));

    console.log(`Config removed from LocalStorage`);
  }
}

export default Storage;
