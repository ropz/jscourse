const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 // four core concepts
 // entry point, loaders, plugins
 entry: ['babel-polyfill', './src/js/index.js'],
 output: {
  path: path.resolve(__dirname, 'dist'), // path needs absolute path , devserver injects into html file
  filename: 'js/bundle.js'
 },
 devServer: {
  contentBase: './dist',
 },
 plugins: [
  new HtmlWebpackPlugin({
   filename: 'index.html',
   template: './src/index.html',
  })
 ],
 module: {
  rules: [
   {
    test: /\.js$/, // look for all .js files
    exclude: /node_modules/,
    use: {
     loader: 'babel-loader'
    }
   }
  ]
 }

}