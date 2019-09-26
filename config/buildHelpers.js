const path = require('path');
const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
	src: path.resolve(__dirname, '../src'),
};

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
						options: { minimize: true }
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
			}
		]
	}
}

function getPlugins(isProduction) {
	return [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new PurgecssPlugin({
			paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
		}),
	]
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
		// Display only errors to reduce the amount of output.
		stats: 'errors-only',
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
	getModule,
	getPlugins,
	getServer,
	getOptimization,
};