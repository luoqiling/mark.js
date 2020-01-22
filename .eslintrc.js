module.exports = {
  root: true,
  env: {
    browser: true
  },
  globals:{
    'Promise': true
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': [2, 'never'],
    'semi': [2, 'never']
  },
  parser: 'babel-eslint'
  // parserOptions: {
  //   'ecmaVersion': 6,
  //   'sourceType': 'module'
  // }
}
