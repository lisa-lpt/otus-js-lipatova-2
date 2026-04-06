const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const repoName = process.env.REPO_NAME || '';
const BASE_PATH = repoName ? `/${repoName}/` : '/';

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: BASE_PATH,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // This will copy the file to the output directory and return its public URL
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __BASE_PATH__: JSON.stringify(BASE_PATH),
    }),

    // index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    // 404.html
    new HtmlWebpackPlugin({
      template: './public/404.html',
      filename: '404.html',
      inject: false,
      templateParameters: {
        BASE_PATH,
      },
    }),
  ],
};
