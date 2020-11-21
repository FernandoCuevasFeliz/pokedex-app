const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './js/scripts.min.js',
    path: path.resolve(__dirname, '../public'),
  },
  module: {
    rules: [
      //  pug
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },

      // scss|css
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },

      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: './src/views/index.pug',
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.min.css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/assets/img', to: 'assets/img' }],
    }),
  ],
};
