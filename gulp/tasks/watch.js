var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

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
