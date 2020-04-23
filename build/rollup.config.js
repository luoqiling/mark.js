const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify').uglify
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const path = require('path')
const pkg = require('../package.json')
const NODE_ENV = process.env.NODE_ENV

const config = {
  input: path.resolve(__dirname, '../', pkg.main),
  output: {
    file: path.resolve(__dirname, '../dist', `${NODE_ENV === 'development' ? 'mark.js' : 'mark.min.js'}`),
    name: 'Mark',
    format: 'umd'
  },
  plugins: [
    resolve(),

    commonjs({
      include: 'node_modules/**'
    }),

    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ]
}

if (NODE_ENV === 'production') {
  config.plugins.push(
    uglify()
  )
}

module.exports = config
