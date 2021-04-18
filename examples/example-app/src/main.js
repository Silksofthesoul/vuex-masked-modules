// Libraries
import 'vite/dynamic-import-polyfill';
import 'es6-promise/auto';

import { createApp } from 'vue'

// Resources
import App from '@/App.vue';
import store from '@/store';

const app = createApp(App);

app.use(store);

app.mount('#app');
