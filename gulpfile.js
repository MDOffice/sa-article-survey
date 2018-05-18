var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    connect = require('gulp-connect'),
    del = require('del'),
    log = require('fancy-log'),
    babel = require('gulp-babel');

var csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb');

var paths = {
    scripts: './src/js/*.js',
    styles: './src/scss/*.css'
};


gulp.task('connect', function () {
    connect.server({
        root: [
            'demo',
            'dist',
            'node_modules/jquery/dist',
            'node_modules/jquery-mockjax/dist',
            'node_modules/bootstrap/dist/css'
        ],
        port: 9000,
        livereload: true
    });
    console.log('Server listening on http://localhost:9000');
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
    //.pipe(babel({presets: ['env']}))
        .pipe(concat('sa-article-survey.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(csscomb())
        .pipe(concat('sa-article-survey.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('clean', function () {
    del(['dist/js/*', 'dist/css/*']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'connect', 'scripts', 'styles'], function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('build', ['clean', 'scripts', 'styles']);