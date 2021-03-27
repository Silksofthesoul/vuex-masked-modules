const path = require('path');

const entry = {
  index: './src/index.js',
};

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  filename: '[name].js'
};

const target = 'web';
const devtool = 'source-map';

const _module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      // loader: 'babel-loader'
      use: [
        'babel-loader',
        {
          loader: 'string-replace-loader'
        }
      ]
    },
  ]
};

const externals = {
   'crypto-js': 'crypto-js'
};

module.exports = {
  entry,
  output,
  target,
  devtool,
  module: _module,
  externals,
  stats: {
    errorDetails: true
  }
};
