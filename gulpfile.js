var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var babel = require('gulp-babel');

// setup the local enviroment
gulp.task('connect', function(){
  connect.server({
    root: 'public',
    livereload: true
  });
});

// compile sass and log errors in the terminal
gulp.task('sass', function () {
  return gulp.src('./sass/styles.scss')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(gulp.dest('./public/css'));
});

// transpile our ES6 javascript into ES5
gulp.task('transpile', function() {
  return gulp.src('./scripts/*.js')
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(gulp.dest('./public/js'))
});

// setup the live reload of public files
gulp.task('livereload', function (){
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

// watch for changes
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./scripts/**/*.js', ['transpile']);
  gulp.watch('./public/**/*', ['livereload']);
});

// setup the default 'gulp task'
gulp.task('default', ['connect', 'watch', 'sass', 'transpile']);
