/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 07-02-2017
*/

// importer les modules NPM
var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require("browserify");
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var removeHtmlComments  = require('gulp-remove-html-comments');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Config of project folders
var config = {
    pages     : ['dev/www/*.html'], 
    desDir:    './dist' /* répértoire de destination (prod) */
}

// Default Gulp starting task
gulp.task("run",[
  'build-js',
  'copy-html'
]);
gulp.task('default', ['run'], function() {
    gulp.start('startServer', 'watch');
});

// Task to build JS files
gulp.task("build-js", function(){
    return browserify("dev/app/app.js",{
        debug: true
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(config.desDir + '/js'))
    .pipe(reload({stream:true}));
});
// Task to copy HTML files
gulp.task("copy-html", function(){
    return gulp.src(config.pages)
        .pipe(removeHtmlComments())
        .pipe(gulp.dest(config.desDir))
        .pipe(reload({stream:true}));
});

// Task to run local server
gulp.task("startServer",  function() {
    browserSync.init({
      server: {
          baseDir: config.desDir
      },
      notify: true
    });
});
// Task to watch wich file is changing and load the right task
gulp.task('watch', function() {
  gulp.watch('./dev/app/**/*.js', ['build-js']);     // watch js file changes
  gulp.watch('./dev/**/*.html', ['copy-html']);      // watch all html template file changes
  //gulp.watch('PATH-OF-FILES-TO-WATCH', ['TASK-TO-RUN']);   // Simply uncomment exemple and set your own params (files-to-watch && task-to-run).
})
