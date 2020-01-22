const path = require('path')
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  entry: path.resolve(__dirname, '../index.js'),
  mode: NODE_ENV,
  output: {
    filename: NODE_ENV === 'development' ? 'proofread.js' : 'proofread.min.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'Proofread',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        include: /lib/
      }
    ]
  }
}
