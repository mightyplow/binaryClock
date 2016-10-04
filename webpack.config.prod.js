const webpack = require('webpack');
const devConfig = require('./webpack.config.dev.js');

const prodConfig = Object.assign({}, devConfig);

prodConfig.output.filename = 'binaryClock.min.js';
prodConfig.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
];

module.exports = prodConfig;