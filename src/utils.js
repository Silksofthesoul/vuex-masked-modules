import CryptoJS from 'crypto-js';

// fn
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// math
export const random = _ => Math.random();
export const floor = _ => Math.floor(_);
export const rndMinMaxInt = (min, max) => floor(random() * (max - min + 1)) + min;
export const getUniqIntArray = (length, min, max) => {
  const unq = [];
  if (min > max) return false;
  if (max - min < length) {
    length = max - min;
  }
  while (unq.length < length) {
    const rnd = rndMinMaxInt(min, max);
    if (unq.indexOf(rnd) === -1) {
      unq.push(rnd);
    }
  }
  return unq;
};

// type
export const str = arg => String(arg);
export const getType = val => typeof val;
export const type = getType;

export const isExist = arg => !(arg === undefined || arg === null || Number.isNaN(arg));

export const isString = val => {
  if (!isExist(val)) return false;
  if (type(val) !== 'string') return false;
  if (Object.getPrototypeOf(val).constructor.name !== 'String') return false;
  return true;
};

export const isArray = array => {
  if (!isExist(array)) return false;
  if (type(array) !== 'object') return false;
  if (Object.getPrototypeOf(array).constructor.name !== 'Array') return false;
  return true;
};

export const isObject = val => {
  if (!isExist(val)) return false;
  if (type(val) !== 'object') return false;
  if (isArray(val)) return false;
  return true;
};

// array
export const p = s => JSON.parse(s);
export const s = (o, fp = null, sp = null) => JSON.stringify(o, fp, sp);
export const co = o => p(s(o));
export const every = arr => val => arr.every(item => item === val);

// localStorage
export const getStorage = _ => window.localStorage;
export const writeStore = (key, val) => {
  const store = getStorage();
  if(isString(val)) store.setItem(key, val);
  else return store.setItem(key, s(val));
};

export const readStore = key => {
  const store = getStorage();
  return store.getItem(key);
};

// obejct
export const has = (o, key) => Object.prototype.hasOwnProperty.call(o, key);
export const removeProperty = prop => ({ [prop]: undefined, ...object }) => object;

// time
export const getTimestamp = _ => new Date().valueOf();

// cryptography:
export const encUtf8Str = CryptoJS.enc.Utf8.stringify;
export const encHexParse = CryptoJS.enc.Hex.parse;
export const encUtf8 = CryptoJS.enc.Utf8;
export const crAESenc = CryptoJS.AES.encrypt;
export const crAESdec = CryptoJS.AES.decrypt;
export const encUtf8Parse = CryptoJS.enc.Utf8.parse;
export const wrpSHA515 = CryptoJS.SHA512;
export const wrpMD5 = CryptoJS.MD5;
export const sha512 = data => wrpSHA515(str(data)).toString();
export const md5 = data => wrpMD5(str(data)).toString();

export const  seaSalt = _ => {
  const library = [...Array(1024 * 9)]
  .map((_, w) => String.fromCharCode(w));
  const { length } = library;
  let res = '';
  for(let i = 0; i < 2; i++) res += library[rndMinMaxInt(0, length)];
  return res;
};

export const wrapStab = data => pipe(
  arg => arg,
  arg => btoa(arg),
  arg => encUtf8Parse(arg).toString(),
)(data);

export const wrap = data => pipe(
  arg => arg,
  arg => btoa(arg),
  arg => `${seaSalt()}${arg}${seaSalt()}`,
  arg => encUtf8Parse(arg).toString(),
)(data);

export const unwrap = data => pipe(
  arg => arg,
  arg => encUtf8Str(encHexParse(arg)),
  arg => arg.substr(2, arg.length - 4),
  arg => atob(arg),
)(data);

export const crp = (data, key) => wrap(crAESenc(data, key).toString());
export const dcr = (data, key) => {
  const bytes = crAESdec(unwrap(data), key);
  return bytes.toString(encUtf8);
};

export const encrypt = (data, key) => {
  if(isString(data)) return crp(data, key);
  else return crp(s(data), key);
};

export const decrypt = (data, key) => dcr(data, key);


export const keyGen = _ => {
  const appVersion = str(window.navigator.appVersion);
  const date = str(getTimestamp());
  const uniq = sha512(str(getUniqIntArray(9, 0, 9).join(''))).split('');
  const res = uniq.map((item, i) => `${item}${i}${rndMinMaxInt(0,9)}`);
  return md5(`${date}-${appVersion}-${res.join('')}`);
};

export const insertKey = (_data, key) => {
  let data = _data.split('');
  const { length: dLength } = data;
  const { length: kLength } = key;
  const kHalf = kLength / 2;
  const dHalf = dLength / 2;
  const start = dHalf - kHalf;
  const end = dHalf + kHalf;
  data.splice(end, 0, key.substring(0, kHalf));
  data.splice(start, 0, key.substring(kHalf));
  return data.join('');
};

export const extractKey = (_data, dataProcessing = arg => arg) => {
  let data = dataProcessing(_data);
  const { length: dLength } = data;
  const kLength = 32;
  const kHalf = kLength / 2;
  const dHalf = dLength / 2;
  const start = dHalf - kHalf;
  const end = dHalf + kHalf;
  const first = data.substring(end + kHalf, end );
  const last = data.substring(start - kHalf, start );
  return `${first}${last}`;
};

export const cleanData = (_data, dataProcessing = arg => arg) => {
  let data = dataProcessing(_data);
  const { length: dLength } = data;
  const kLength = 32;
  const kHalf = kLength / 2;
  const dHalf = dLength / 2;
  const start = dHalf - kHalf;
  const end = dHalf + kHalf;
  const first = data.substring(0, start - kHalf);
  const middle = data.substring(start, start + kLength);
  const last = data.substring(end + kHalf);
  return `${first}${middle}${last}`;
};

export const wrapKey = key => md5(wrapStab(key));
