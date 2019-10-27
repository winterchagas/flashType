function devSetup (server) {
  const webpack = require('webpack');
  const config = require('../../config/webpack.dev.js');
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);

  // const staticMiddleware = express.static("client/devBuild");
  // server.use(staticMiddleware);
}

module.exports.devSetup = devSetup;