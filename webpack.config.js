var path = require('path');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'react-hot-loader/patch',
        // 'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new NpmInstallPlugin()

    ],
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                include: [
                    path.resolve(__dirname, "src"),
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    plugins: [ 'transform-runtime' ]
                },
                include: [
                    path.resolve(__dirname, "src"),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            }
        ]
    },
};