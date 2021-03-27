import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
     entry: resolve(__dirname, 'src/index.js'),
     name: 'vuex-masked-modules'
   },
    // rollupOptions: {
    //   input: resolve(__dirname, './src/main.js')
    // }
  }
});
