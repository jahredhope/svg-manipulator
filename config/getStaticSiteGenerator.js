const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = () =>
  new StaticSiteGeneratorPlugin({
    paths: ['/'],
    entry: 'render',
    globals: {
      window: {},
      navigator: {},
      __SERVER_RENDER: true
    }
  });
