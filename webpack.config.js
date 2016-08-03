const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LIFECYCLE = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	style: path.join(__dirname, 'app', 'style'),
	build: path.join(__dirname, 'build')
};

var config = {
	entry: {
		style: PATHS.style + '/main.css',
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new HtmlWebpackPlugin({ title: 'TinyURL' })
	],
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: 'eslint',
				include: PATHS.app
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
};

process.env.BABEL_ENV = LIFECYCLE;

config = require('webpack-merge')(
	config,
	LIFECYCLE !== 'build'
		? require('./webpack/dev')({
			cssPaths: PATHS.style
		})
		: require('./webpack/prod')({
			define: {
				envVar: 'process.env.NODE_ENV',
				envVal: 'production'
			},
			commons: {
				name: 'vendor',
				entries: ['react']
			},
			buildPath: PATHS.build,
			cssPaths: PATHS.style,
			appPaths: PATHS.app
		})
);
//console.log(require('prettyjson').render(config));
module.exports = config;
