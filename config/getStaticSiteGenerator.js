const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = () =>
  new StaticSiteGeneratorPlugin({
    paths: ['/'],
    entry: 'render'
  });
