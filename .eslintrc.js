module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/essential', '@vue/standard'],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-debugger': 'off',
    'no-console': 'off',
    'no-irregular-whitespace': 'off',
    semi: 0,
    'space-before-function-paren': 0,
    quotes: [1, 'single']
  }
};
