// import { keyGen } from  './utils';

export class MaskedVuex {
  constructor() { console.log('constructor =>>>>>'); }

  getState() { return 'getState =>>>'; }

  getPlugin() { return 'getPlugin =>>>'; }
}

export const maskedVuex = ctx => new MaskedVuex(ctx).getPlugin();

export const one = _ => 1;

export default {
  MaskedVuex,
  maskedVuex,
  one
};
