const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const targetDir = path.resolve(__dirname, './')

module.exports = {
  entry: path.join(targetDir, 'index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        include: /lib/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(targetDir, 'index.html')
    })
  ]
}
