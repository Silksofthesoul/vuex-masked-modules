import { getIndex, isExist } from './utils';
export default {
  isShowThis(state) {
    const {modals} = state;
    return function ({name}) {
      const index = getIndex(modals, name);
      return isExist(index);
    };
  }
};
