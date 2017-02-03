var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    browserSync = require('browser-sync').create();


//gulp.task('task name', function call)
gulp.task('default', function(){
  console.log('We did a task!');
});

//gulp.task('task name', function call)
gulp.task('html', function(){
  console.log('Changes made to index.html');
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles/'));
});

gulp.task('watch', function(){
  //gulp-watch triggers an action when a file on the h
  //HDD changes. Start it in the cmd line with
  //gulp watch
  //ctrl-C to stop watching

  browserSync.init({
    notify: false,
    server: {
      baseDir:"app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    //'./app/assets/styles/**/*.css'
    //** = any potential subdirectories
    gulp.start('cssInject');
  });
});

//gulp.task('task name', ['dependancies'], function call)
gulp.task('cssInject', ['styles'], function(){
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
