module.exports = {
    'env': {
      'browser': true,
      'node': true,
      'es6': true
    },
    'extends': [
      'eslint:recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-restricted-syntax': 'off',
      'no-plusplus': 'off',
      'func-names': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'no-extra-semi': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
};
