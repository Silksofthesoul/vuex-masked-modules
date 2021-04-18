# vuex-masked-modules
Plugin for working with Vuex. Allows to use localeStorage to store state. It is possible to "mask" data in the localStorage cell.

The plugin uses one storage key in which it stores masked data. DO NOT USE FOR STORING CONFIDENTIAL DATA. Just a disguise.

Encryption keys are generated automatically, you cannot set the keys yourself. Perhaps it will be implemented in the next versions. Or maybe not.

## How to use in project

Install [package][npm]:
`npm i -s vuex-masked-modules`

Or copy files from GitHub [https://github.com/Silksofthesoul/vuex-masked-modules][git]

Example usage in project:
```javascript
import { MaskedVuex, maskedVuex } from 'vuex-masked-modules';

export const storageName = 'app'; // key in localStorage
export const namespace = 'ModuleName'; // key in store, module name
export const isEncrypt = true; // encrypt (masked) data or not
export const isMaskedKey = true; // masked key in store or not
export const isInitLog = true; // show store object in console
export const isFlush = false; // flush store

// middlewares functions
export const middlewares = [
  ({type, payload}) => console.log(type, payload),
];

// data template (state)
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

export const plugin = ({namespace}) => maskedVuex({ ...settings, namespace });

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

## Examples

[See examples][examples]

You can inspect your localStorage after running the test application.

## Test

Run `npm test`

## Contribution

I will be glad if you inform me about [bugs][issues], [wishes][issues], or make a [Pull Request][PR]. Feel free.

[examples]: https://github.com/Silksofthesoul/vuex-masked-modules/tree/main/examples
[git]: https://github.com/Silksofthesoul/vuex-masked-modules
[npm]: https://www.npmjs.com/package/vuex-masked-modules
[issues]: https://github.com/Silksofthesoul/vuex-masked-modules/issues
[PR]: https://github.com/Silksofthesoul/vuex-masked-modules/pulls
