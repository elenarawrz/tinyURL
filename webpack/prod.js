const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

module.exports = function(options) {
	var entry = {};
	entry[options.commons.name] = options.commons.entries;
	var envVar = {};
	envVar[options.define.envVar] = JSON.stringify(options.define.envVal);

	return {
		entry: entry,
		output: {
			filename: '[name].[chunkhash].js',
			chunkFilename: '[chunkhash].js'
		},
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css'),
					include: options.cssPaths
				}
			]
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: { warnings: false }
			}),
			new webpack.DefinePlugin(envVar),
			new webpack.optimize.CommonsChunkPlugin({
				names: [options.commons.name, 'manifest']
			}),
			new CleanWebpackPlugin(
				[options.buildPath],
				{ root: process.cwd() }
			),
			new ExtractTextPlugin('[name].[chunkhash].css'),
			new PurifyCSSPlugin({
				basepath: process.cwd(),
				paths: [options.appPaths]
			})
		]
	};
};
