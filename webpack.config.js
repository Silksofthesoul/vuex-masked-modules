const path = require('path');

const entry = {
  index: './src/index.js',
};
const experiments = {
  outputModule: true,
};

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  filename: 'index.js',
  library: {
    // name: 'one',
    type: 'module',
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


module.exports = {
  module: _module,
  entry,
  experiments,
  output,
  target,
  devtool,
  stats: {
    errorDetails: true
  }
};
