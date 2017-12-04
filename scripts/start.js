process.env.NODE_ENV = 'development';
const paths = require('../config/paths');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const Webpack = require('webpack');
const openBrowser = require('react-dev-utils/openBrowser');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';
const port = 3000;
const isInteractive = true;

const webpackConfig = require('../config/webpack.config.dev');


const compiler = Webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, {
  compress: true,
  contentBase: paths.appPublic,
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  https: protocol === 'https',
  host: host
});

devServer.listen(port, (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting the development server...'));
  console.log();

  if (isInteractive) {
    openBrowser(protocol + '://' + host + ':' + port + '/');
  }
});
