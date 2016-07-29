const webpack = require('webpack');

module.exports = {
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
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        })
    ]
}
