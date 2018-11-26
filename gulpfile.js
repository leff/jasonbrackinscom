'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug  = require('gulp-pug'),
      browserSync = require('browser-sync'),
      del  = require('del');

gulp.task('clean', function(cb) {
  return del(['docs/**/*'], cb);
});

gulp.task('sass', ['clean'], function() {
  return gulp.src('src/jb.scss')
    .pipe(sass())
    .pipe(gulp.dest('docs'));
});

gulp.task('pug', ['clean'], function() {
  return gulp.src('src/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('docs'));
});

gulp.task('assets', ['clean'], function() {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('docs/assets'));
});

gulp.task('CNAME', ['clean'], function() {
  return gulp.src('src/CNAME')
    .pipe(gulp.dest('docs'));
});

gulp.task('hotdog', ['clean'], function() {
  return gulp.src(['src/games/hotdog/**/*', '!src/games/**/*.pug'])
    .pipe(gulp.dest('docs/games/hotdog'));
});

gulp.task('watch', ['build'], function () {
  return gulp.watch('src/**/*', ['build']);
});

gulp.task('testserver', ['watch'], function () {
  browserSync.init({
    server: { baseDir: "./docs" }
  });
  gulp.watch('src/**/*', ['build']);
});

gulp.task('build', ['sass', 'pug', 'assets', 'CNAME', 'hotdog']);

gulp.task('default', ['build']);