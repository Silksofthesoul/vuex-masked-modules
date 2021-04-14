# vuex-masked-modules
Plugin for working with Vuex. Allows to use localeStorage to store state. It is possible to "mask" data in the localStorage cell.


## How to use in project

example:
```javascript
import { MaskedVuex, maskedVuex } from 'vuex-masked-modules';

export const storageName = 'app'; // key in localStorage
export const namespace = 'ModuleName'; // key in store, module name
export const isEncrypt = true; // encrypt (masked) data or not
export const isMaskedKey = true; // masked key in store or not
export const isInitLog = true; // show store object in console
export const isFlush = false; // flush store

export const middlewares = [
  ({type, payload}) => console.log(type, payload),
];

export const template = {
  arr: [2, 4, 6],
  isVisible: false
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

const state = new MaskedVuex({ ...settings });

export const plugin = ({namespace}) => {
  return maskedVuex({ ...settings, namespace });
}

export default {
  namespaced: true,
  mutations: {
    show(state) { state.isVisible = true; },
    hide(state) { state.isVisible = false; }
  },
  getters: {
    test(state) { return state.arr.map(item => item * 2); }
  },
  namespace,
  state,
  plugin
};
```
