module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 7,
    jsx: true
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  rules: {
    'jsx-a11y/href-no-hash': 'off'
  }
};
