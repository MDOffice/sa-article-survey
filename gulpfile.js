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
        root: ['demos'],
        port: 9000,
        livereload: true
    });
    console.log('Server listening on http://localhost:9000');
});

gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(concat('sa-article-survey.min.js'))
        .on('error', log) // Если есть ошибки, выводим и продолжаем
        .pipe(uglify())
        .pipe(gulp.dest('./demos/scripts'))
        .pipe(connect.reload());
});

gulp.task('scripts-deploy', function () {
    return gulp.src(paths.scripts)
        //.pipe(babel({presets: ['env']}))
        .pipe(concat('sa-article-survey.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .on('error', log)
        .pipe(csscomb())
        .pipe(concat('sa-article-survey.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('./demos/styles'))
        .pipe(connect.reload());
});

gulp.task('styles-deploy', function () {
    return gulp.src(paths.styles)
        .pipe(csscomb())
        .pipe(concat('sa-article-survey.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('clean', function () {
    del(['dist']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['connect', 'scripts', 'styles'], function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('deploy', ['scripts-deploy', 'styles-deploy']);