'use strict';

const webpack = require('webpack');
var plugins = require('webpack-load-plugins')();

module.exports = {
  entry: './browser/react/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      { 
        test: /\.css$/,
        loader: "css-loader" 
      }
    ], 

    plugins: [
      'import', {
        libraryName: "antd"       //need to resolve this issue w css
      }
    ]

  }
};
