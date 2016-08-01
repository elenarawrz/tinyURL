const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

var config = {
  entry: {
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
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};

config = require('webpack-merge')(
  config,
  process.env.npm_lifecycle_event !== 'build'
    ? require('./webpack/dev')({
        cssPaths: PATHS.app + '/style'
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
        cssPaths: PATHS.app + '/style'
      })
);
//console.log(require('prettyjson').render(config));
module.exports = config;
