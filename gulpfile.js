/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 11-12-2016
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
var ghPages = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var buffer = require("vinyl-buffer");
var sourcemaps = require('gulp-sourcemaps');

// Config of project folders
var config = {
    pages     : ['dev/www/*.html'], 
    css       : ['dev/src/materialize/css/*.min.css', 'dev/src/css/*.css'],
    fonts     : ['dev/src/materialize/fonts/**/*'],
    jsDep     : ['dev/src/materialize/js/*.min.js'],
    desDir:    './dist' /* répértoire de destination (prod) */
}

// Default Gulp starting task
gulp.task("run",[
  'build-js',
  'copy-html',
  'copy-css',
  'copy-fonts',
  'copy-js-dep'
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
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
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

// Task to copy CSS files
gulp.task("copy-css", function(){
    return gulp.src(config.css)
        .pipe(gulp.dest(config.desDir+'/css'))
        .pipe(reload({stream:true}));
});

// Task to copy Fonts files
gulp.task("copy-fonts", function(){
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.desDir+'/fonts'))
});

// Task to copy JS Dependencies files
gulp.task("copy-js-dep", function(){
    return gulp.src(config.jsDep)
        .pipe(gulp.dest(config.desDir+'/js'))
});

// Tash to push ./dist folder on Github gh-pages
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
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
  gulp.watch('./dev/src/css/*.css', ['copy-css']);   // Simply uncomment exemple and set your own params (files-to-watch && task-to-run).
  //gulp.watch('PATH-OF-FILES-TO-WATCH', ['TASK-TO-RUN']);   // Simply uncomment exemple and set your own params (files-to-watch && task-to-run).
})
