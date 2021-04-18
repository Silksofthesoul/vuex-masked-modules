import {settings} from './settings';
import { MaskedVuex } from 'vuex-masked-modules';

const state = new MaskedVuex({ ...settings });
export default state.getState.bind(state);
