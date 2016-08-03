const webpack = require('webpack');

module.exports = function(options) {
	return {
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		devServer: {
			hot: true,
			inline: true,
			historyApiFallback: true,
			stats: 'errors-only'
			/*,host: options.host,
			port: options.port*/
		},
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader?modules',
					include: options.cssPaths
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]
	};
};
