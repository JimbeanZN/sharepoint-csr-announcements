'use strict';

var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rimraf = require('rimraf');

var dest = './dist/';
var sourceSass = './src/sass/';
var sourceJs = './src/js/';

gulp.task('clean', function (cb) {
   rimraf(dest, cb);
});

gulp.task('build:sass', ['clean'], function () {
  return gulp.src(sourceSass + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dest));
});

gulp.task('build:images', ['build:sass'], function () {
  return gulp.src(sourceSass + '/images/**/*')
    .pipe(gulp.dest(dest + '/images/'));
});

gulp.task('build:csr', ['clean'], function () {
  return gulp.src(sourceJs + 'announcement-message-csr.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:js', ['build:sass'], function () {
  return gulp.src(sourceJs + 'announcement-message.min.js')
    .pipe(gulp.dest(dest));
});

gulp.task('default', [ 'clean', 'build:sass', 'build:images', 'build:csr', 'build:js' ]);
