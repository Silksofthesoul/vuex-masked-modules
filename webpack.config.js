const path = require('path');

const entry = {
  index: './src/t.js',
};

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  filename: 'index.js',
  library: {
    name: 'one',
    type: 'umd2',
  },
};

const target = 'web';
const devtool = 'source-map';

const _module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
  ]
};

const externals = {
   'crypto-js': {
     commonjs: 'crypto-js'
   }
};

module.exports = {
  module: _module,
  entry,
  output,
  target,
  devtool,
  externals,
  stats: {
    errorDetails: true
  }
};
