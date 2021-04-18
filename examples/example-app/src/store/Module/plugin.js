import {settings} from './settings';
import { maskedVuex } from 'vuex-masked-modules';

export default function ({namespace}) {
  return maskedVuex({ ...settings, namespace });
}
