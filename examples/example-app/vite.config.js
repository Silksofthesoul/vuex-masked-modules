import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
require('dotenv').config();

export const nodeEnv = process.env.NODE_ENV;
export const isProd = nodeEnv === 'production';
export const isDev = nodeEnv === 'development';
const { log } = console;
const ic = (c, a, b) => c ? a : b ;

log('start:\n');
log('NODE_ENV:', process.env.NODE_ENV);
log('isProd:', isProd);
log('isDev:', isDev);

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@npm': resolve(__dirname, 'node_modules'),
      '@root': resolve(__dirname, '../src'),
      '@stl': resolve(__dirname, './src/assets/styles'),
      '@cmp': resolve(__dirname, './src/components'),
      '@lib': resolve(__dirname, './src/library'),
    }
  },

  css: {
    modules: {
      generateScopedName: ic(isDev, '[local]:[hash:base64:5]', '[hash:base64:5]'),
      localsConvention: 'camelCaseOnly'
    }
  },

  build: {
    sourcemap: ic(isDev, true, false),
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, './src/main.js')
    }
  }
});
