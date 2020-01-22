const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require("gulp-rename")
const path = require('path')
const webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV

sass.compiler = require('node-sass')

gulp.task('sass', () => {
  return gulp.src(path.resolve(__dirname, '../lib/theme/**/*.scss'))
    .pipe(sass({ outputStyle: NODE_ENV === 'development' ? 'expanded' : 'compressed' }).on('error', sass.logError))
    .pipe(rename(path => { path.basename = NODE_ENV === 'development' ? 'proofread' : 'proofread.min' }))
    .pipe(gulp.dest(path.resolve(__dirname, '../dist')))
})

gulp.task('webpack', done => {
  webpack(require(path.resolve(__dirname, './webpack.config.js')), (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err)
    }
    done()
  })
})

gulp.task('build', gulp.parallel('sass', 'webpack'))
