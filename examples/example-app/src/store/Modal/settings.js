export const storageName = 'app';
export const namespace = 'Modal';
export const isEncrypt = true;
export const isMaskedKey = true;
export const isInitLog = true;
export const isFlush = false;
export const middlewares = [
  ({type, payload}) => console.log(type, payload),
];

export const template = {
  modals: [],
  abs: 123,
  helloWorld: 'hi',
  o: {
    abc: 123
  }
};

export const settings = {
  storageName,
  namespace,
  isEncrypt,
  isMaskedKey,
  isInitLog,
  isFlush,
  middlewares,
  template,
};
