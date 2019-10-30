const path = require('path');
const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../client/src'),
  dev: path.resolve(__dirname, '../devBuild'),
  prod: path.resolve(__dirname, '../prodBuild'),
};

function getEntry(isProduction) {
  return !isProduction ? [
    'webpack-hot-middleware/client',
    `${PATHS.src}/index.js`
  ] : [`${PATHS.src}/index.js`]
}

function getOutput(isProduction) {
  return {
    // publicPath: './',
    filename: `[name]-bundle.js`,
    path: isProduction ? PATHS.prod : PATHS.dev
  }
}

function getModule(isProduction) {
  return {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[hash].[ext]"
            }
          }
        ]
      }
    ]
  }
}

function getPlugins(isProduction) {
  const plugins = [
    new HtmlWebPackPlugin({
      template: './client/src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ];
  if (isProduction) {
    plugins.push(new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
    }));
  } else {
    plugins.unshift(new webpack.HotModuleReplacementPlugin());
    plugins.unshift(new webpack.NamedModulesPlugin());
  }
  return plugins;
}

function getOptimization() {
  return {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}


function getServer() {
  return {
    stats: {
      colors: true,
      'errors-only': true,
    },
    contentBase: '../devBuild',
    hot: true,
    // Display only errors to reduce the amount of output.
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
    overlay: true,
    historyApiFallback: true,
  }
}

module.exports = {
  getEntry,
  getOutput,
  getModule,
  getPlugins,
  getServer,
  getOptimization,
};