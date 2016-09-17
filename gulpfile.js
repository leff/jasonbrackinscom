'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug  = require('gulp-pug'),
      del  = require('del');

gulp.task('clean', function(cb) {
  return del(['public'], cb);
});

gulp.task('sass', ['clean'], function() {
  return gulp.src('src/jb.scss')
    .pipe(sass())
    .pipe(gulp.dest('public'));
});

gulp.task('pug', ['clean'], function() {
  return gulp.src('src/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('public'));
});

gulp.task('assets', ['clean'], function() {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('public/assets'));
});

gulp.task('watch', ['build'], function () {
  return gulp.watch('src/**/*', ['build']);
});

gulp.task('build', ['sass', 'pug', 'assets']);
gulp.task('default', ['build']);