const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const less = require('gulp-less');
const path = require('path');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');


// By default build for dev
gulp.task('default', ['js', 'css', 'static'], function () {});

// Build minified version for release
gulp.task('release', ['minified-js', 'minified-css', 'static'], function () {});

// Recompile for dev as files change
gulp.task('dev', function () {
    gulp.watch(['./src/**/*.js', './src/**/*.jsx'], { interval: 500 }, ['js']);
    gulp.watch(['./src/styles/**/*.less'], { interval: 500 }, ['less']);
    gulp.watch(['./src/index.html', './src/styles/**/*.css', './src/images/**/*.*'], { interval: 500 }, ['static']);
});


// Compiles JS
gulp.task('js', function () {
    browserify('./src/app.js')
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/'));
});

// Compiles CSS
gulp.task('css', ['less'], function () {});

// Compiles LESS
gulp.task('less', function () {
    return gulp.src('./src/styles/main.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/styles/'));
});

// Copies static files
gulp.task('static', function () {
    return gulp.src([
        './src/index.html',
        './src/styles/**/*.css',
        './src/images/**/*.*'
    ], {base: './src/'})
        .pipe(gulp.dest('./dist/'));
});

// Compiles minified JS
gulp.task('minified-js', function () {
    browserify('./src/app.js')
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

// Minifies CSS
gulp.task('minified-css', ['css'], function () {
    return gulp.src('./dist/styles/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/styles/'));
});