import { namespace } from './settings';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import plugin from './plugin';

export const Plugin = plugin;

export const Store = {
  namespaced: true,
  namespace,
  state,
  mutations,
  getters,
  plugin
};

export default Store;
