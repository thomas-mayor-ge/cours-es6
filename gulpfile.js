/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-09-2016
*/

// importer les modules NPM
var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require("browserify");
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var removeHtmlComments  = require('gulp-remove-html-comments');


// Config of project folders
var config = {
    desDir:    './dist' /* répértoire de destination (prod) */
}

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
    .pipe(gulp.dest(config.desDir + '/js'));
});

gulp.task("copy-html", function(){
    return gulp.src(['./dev/**/*.html'])
    .pipe(removeHtmlComments())
    .pipe(gulp.dest(config.desDir))
});
