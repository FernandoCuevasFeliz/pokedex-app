const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.common.config');

module.exports = merge(webpackConfig, {});
