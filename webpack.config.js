const webpack = require('webpack');

const config = {
    entry: './final_chapter.js',
    output: {
        path: __dirname + '/build/',
        filename: 'final_chapter.bundle.js'
    },
    devtool: 'source-map',
    module: {
    },
    plugins: [
    ],
    devServer: {
        index: 'final_chapter.html',
        openPage: 'final_chapter.html',
        open: true
    }
};

module.exports = config;
