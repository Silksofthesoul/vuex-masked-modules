import { Store } from './Store';

import ModalStore from '@/store/Modal';
import ModuleStore from '@/store/Module';
// <#insert-here module> // CLI autotag

const store = new Store();

store.add(ModalStore);
store.add(ModuleStore);
// <#insert-here store> // CLI autotag

export default store.fetch();
