module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', 200],
    'no-multi-assign': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'no-mixed-operators': 'off',
    'no-useless-escape': 'off',
  },
};
