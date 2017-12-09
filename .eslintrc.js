module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 7,
    jsx: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended'
  ],
  plugins: ['eslint-plugin-import', 'eslint-plugin-react'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  rules: {
    'no-console': 'off',
    'jsx-a11y/href-no-hash': 'off'
  }
};
