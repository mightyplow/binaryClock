const webpack = require('webpack');

module.exports = {
    entry: './app/js/binaryClock.js',
    output: {
        path: './dist',
        filename: 'binaryClock.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};