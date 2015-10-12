/**
 * Dependencies
 */

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    declare = require('gulp-declare'),
    del = require('del'),
    handlebars = require('gulp-handlebars'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    wrap = require('gulp-wrap');


/**
 * Default tasks
 */

gulp.task('del-build', function() {
    del(['build/*'], function(err) {
        console.log("build/ files deleted");
    });
});

gulp.task('templates', function(){
    gulp.src(['app/templates/**/*.hbs'])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: '__templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(size({
            title: 'JS size:'
        }))
        .pipe(gulp.dest('app/templates/'));
});

// ['templates'],
gulp.task('js-build', function() {
    gulp.src([
        // dependencies
        'node_modules/jquery/dist/jquery.js',
        'node_modules/handlebars/dist/handlebars.js',
        'node_modules/underscore/underscore.js',
        'node_modules/materialize-css/dist/js/materialize.js',
        'node_modules/backbone/backbone.js',
        'node_modules/backbone.marionette/lib/backbone.marionette.js',
        // app
        'app/app.js',
        'app/vamoYvamo.module.js',
        'app/templates/templates.js',
        'app/utils/handlebars-helpers.js',
        'app/models/*.js',
        'app/collections/*.js',
        'app/views/main.layout.view.js',
        'app/views/actions.item.view.js',
        'app/views/person.item.view.js',
        'app/views/people.collection.view.js',
        'app/views/total.item.view.js'
    ])
    .pipe(concat('bundle.js'))
    .pipe(size({
        title: 'JS size:'
    }))
    .pipe(gulp.dest('build/scripts/'));
});

gulp.task('styles-build', function() {
    gulp.src([
            'node_modules/materialize-css/dist/css/materialize.css',
            'app/styles/*.css'
        ])
        .pipe(autoprefixer({
            browsers: ['last 5 versions','Firefox ESR']
        }))
        .pipe(concat('bundle.css'))
        .pipe(size({
            title: 'CSS size:'
        }))
        .pipe(gulp.dest('build/styles/'));
});

// gulp.task('default', ['del-build', 'templates', 'js-build', 'styles-build']);
gulp.task('default', ['del-build', 'templates', 'js-build', 'styles-build']);

gulp.task('build', ['default']);

gulp.task('watch', function() {
    gulp.start('default');
    gulp.watch([
        'gulpfile.js',
        'app/templates/**/*.hbs',
        'app/*.js',
        'app/**/*.js',
        // 'mocks/mock.js'
    ], ['default']);
    gulp.watch('app/styles/*.css', ['styles-build']);
});