const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    },

    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 9000,
    },
     module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin()],
};
