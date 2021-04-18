import { createStore } from 'vuex';

export class Store {
  constructor() {
    this.modules = [];
    this.plugins = [];
  }

  add (obj) {
    const {namespace, plugin} = obj;
    this.modules.push(obj);
    obj.plugin && this.plugins.push({plugin, namespace});
    return this;
  }

  fetch() {
    const { plugins: _plugins = [] } = this;
    const plugins = _plugins.map(({plugin, namespace}) => plugin({namespace}));
    const store = createStore({ plugins });
    return this.modules.reduce((storeSum, item) => {
      const { mutations, getters, state, namespaced, namespace } = item;
      const moduleState = { mutations, getters, state, namespaced };
      storeSum.registerModule(namespace, moduleState);
      return storeSum;
    }, store);
  }
}

export default Store;
