/*
 * @Author: lg
 * @Date: 2024-01-12 09:34:22
 * @LastEditors: lg
 * @LastEditTime: 2024-01-12 10:43:53
 * @Description:
 * @FilePath: \webapck-babel-plugin\webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/, // 匹配需要使用 Loader 的文件类型
      //   use: './src/my-loader' // 使用你的 Loader
      // }
      {
        test: /.md$/, // 匹配入口文件中加载到的md文件
        use: [
          // 'html-loader',
          './src/my-loader/markdown-loader' // use属性不仅可以使用模块名称，也可以使用模块文件路径
        ]
      },
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};
