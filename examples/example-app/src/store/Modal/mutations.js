import { getIndex, isExist, co } from './utils';


export default {
  show(state, {name, params = {}}) {
    const { modals } = state;
    const index = getIndex(modals, name);
    if(!isExist(index)) state.modals.push({name, params});
  },
  hide(state, { name }) {
    const { modals } = state;
    const index = getIndex(modals, name);
    // console.log({name, index});
    if(isExist(index)) {
      modals.splice(index, 1);
      state.modals = co(modals);
    }
  }
};
