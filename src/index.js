import {
  encrypt as ecr,
  decrypt as dcr,

  keyGen,
  insertKey,
  extractKey,
  cleanData,
  wrapKey,

  co, s, p, every,

  removeProperty, has,

  readStore as readS, writeStore as writeS,

  isExist, isString, isObject
} from  './utils';

export class MaskedVuex {
  #namespace = null;
  #template = {};
  #storageName = '';
  #isEncrypt = false;
  #isMaskedKey = false;
  #isInitLog = false;
  #isEncriptedStoreInit = false;
  #storageObject = {};
  #storageType = 'localStorage';
  #storageAcceptedTypes = ['localStorage', 'sessionStorage'];
  #key = null;
  #middlewares = [];
  constructor({
    namespace,
    storageName,
    template,
    isEncrypt = false,
    isMaskedKey = false,
    isInitLog = true,
    isFlush = false,
    storageType = 'localStorage',
    middlewares = [],
  }) {
    const cond = [ isExist(namespace), isExist(storageName) ];
    if(!every(cond)(true)) return this.#reject;
    if(this.#storageAcceptedTypes.includes(storageType) === true) this.#storageType = storageType;
    this.#namespace = namespace;
    this.#template = template;
    this.#storageName = storageName;
    this.#isEncrypt = isEncrypt;
    this.#isMaskedKey = isMaskedKey;
    this.#isInitLog = isInitLog;
    this.#isEncriptedStoreInit = false;
    this.#storageObject = {};
    this.#key = null;
    if(isFlush) return this.#flush();
    this.#middlewares = middlewares;
    this.#startStoreCheck();
    this.#storageObject = {[this.#nspGuard()]: this.getState()};
  }

  #runMiddlewares(mutation, state) {
    const getNamespace = str => str.replace(/(\/.*$)/igm, '');
    const arr = this.#middlewares;
    const { length } = arr;
    const { type } = mutation;
    const callNamespace = getNamespace(type);
    const isAllright = callNamespace === this.#namespace;
    if(isAllright) for (let i = 0; i < length; i++) arr[i](mutation, state);
  }

  #flush () {
    let storeRow = p(readS(this.#storageName, this.#storageType) || '{}');
    if(has(storeRow, this.#namespace)) {
      storeRow = removeProperty(this.#namespace)(storeRow);
      writeS(this.#storageName, s(storeRow), this.#storageType);
    }
    if(has(storeRow, wrapKey(this.#namespace))) {
      storeRow = removeProperty(wrapKey(this.#namespace))(storeRow);
      writeS(this.#storageName, s(storeRow, this.#storageType));
    }
    const template = co(this.#template);
    return {
      getState() { return template; },
      getPlugin() { return function (store) { }; }
    };
  }

  #writeStore () {
    let existStore = this.#readStore(this.#storageType);
    let toWriteObject = co({...existStore, ...this.#storageObject});
    if(this.#isEncrypt) {
      let encr = this.#encrypt(this.#storageObject[this.#nspGuard()]);
      encr = insertKey(encr, this.#key);
      toWriteObject = {...existStore, [this.#nspGuard()]: encr};
    }
    const data = s(toWriteObject);
    writeS(this.#storageName, data, this.#storageType);
  }

  #readStore () {
    const resStore = readS(this.#storageName, this.#storageType);
    try {
      var res = isExist(resStore) ? p(resStore): resStore;
    } catch (e) {
      res = co({[this.#nspGuard()]: this.#template});
    }
    return res;
  }

  #setState(stateModule) {
    this.#storageObject[this.#nspGuard()] = stateModule;
    this.#writeStore();
  }

  #encrypt (data) {
    if(!this.#key) this.#key = keyGen();
    return ecr(s(data), this.#key);
  }

  #decrypt (data) {
    if(!this.#key) this.#key = extractKey(data, this.#encChangesGuard.bind(this));
    let cData = cleanData(data, this.#encChangesGuard.bind(this));
    try {
      var res = dcr(cData, this.#key);
    } catch (e) {
      this.#initState();
      return this.#template;
    }
    return p(res);
  }

  getState() {
    const storeRes = this.#readStore();
    if(!isExist(storeRes[this.#nspGuard()])) this.#writeStore();

    if(this.#isEncrypt && this.#isEncriptedStoreInit) {
      return this.#decrypt(storeRes[this.#nspGuard()]);
    }else if(this.#isEncrypt && !this.#isEncriptedStoreInit) {
      return this.#decrypt(storeRes[this.#nspGuard()]);
    } else if(!this.#isEncrypt && this.#isEncriptedStoreInit) {
      return storeRes[this.#nspGuard()] || this.#template;
    } else {
      return storeRes[this.#nspGuard()] || this.#template;
    }
  }

  #checkEncrypt (data) {
    let res = false;
    if(isString(data)) res = true;
    else if(isObject(data)) res = false;
    return res;
  }

  #isFirstRun (res) {
    const cond = [
      isExist(res),
      res && has(res, this.#nspGuard()),
      res && isExist(res[this.#nspGuard()]),
      res && res[this.#nspGuard()] !== ''
    ];
    if(!every(cond)(true)) return true;
    return false;
  }

  #initState() {
    this.#storageObject[this.#nspGuard()] = co(this.#template);
    this.#writeStore();
  }

  #startStoreCheck () {
    const res = this.#readStore();
    if(this.#isFirstRun(res)) {
      this.#initState();
    } else {
      this.#isEncriptedStoreInit = this.#checkEncrypt(res[this.#nspGuard()]);
      if(this.#isEncriptedStoreInit) {
        this.#storageObject[this.#nspGuard()] = this.#decrypt(res[this.#nspGuard()]);
      } else {
        this.#storageObject = res;
      }
      this.#writeStore();
    }
    this.#garbageKeyGuard();
  }

  #encChangesGuard (_data) {
    let data = '';
    if(!isString(_data) && isExist(_data)) {
      this.#storageObject[this.#nspGuard()] = co(_data);
      this.#writeStore();
      const resStore = this.#readStore();
      data = resStore[this.#nspGuard()];
    } else {
      data = _data;
    }
    return data;
  }

  #reject () { return null; }

  #getStoreModule (state) {
    return co(state)[this.#namespace];
  }

  #nspGuard() {
    if(this.#isMaskedKey) return wrapKey(this.#namespace);
    else return this.#namespace;
  }

  #garbageKeyGuard() {
    let storeRow = p(readS(this.#storageName, this.#storageType) || '{}');
    if(this.#isMaskedKey) {
      if(has(storeRow, this.#namespace)) {
        storeRow = removeProperty(this.#namespace)(storeRow);
        writeS(this.#storageName, s(storeRow), this.#storageType);
      }
    } else {
      if(has(storeRow, wrapKey(this.#namespace))) {
        storeRow = removeProperty(wrapKey(this.#namespace))(storeRow);
        writeS(this.#storageName, s(storeRow), this.#storageType);
      }
    }
  }

  #initLog() {
    const {dir} = console;
    if(this.#isInitLog) dir(this);
  }

  getPlugin() {
    const self = this;
    if(self.#isInitLog) self.#initLog();
    return function (store) {
      store.subscribe((mutation, state) => {

        self.#runMiddlewares(mutation, state);

        const stateModule = self.#getStoreModule(state);

        if(!isExist(stateModule)) return self.#reject();
        self.#setState(stateModule);
      });
    };
  }
}

export const maskedVuex = ctx => new MaskedVuex(ctx).getPlugin();

export default {
  MaskedVuex,
  maskedVuex,
};
