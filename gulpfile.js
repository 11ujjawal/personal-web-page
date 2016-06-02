var gulp = require('gulp'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minify = require('gulp-clean-css'),
    wiredep = require('wiredep').stream;

var SRC_INDEX_HTML = 'src/index.html',
    TARG_INDEX_HTML = '',
	DIST_INDEX_HTML = 'index.html',
    SRC_PAGES_HTML = 'src/pages/*.html',
    TARG_PAGES_HTML = 'dist/pages/',
    DIST_PAGES_HTML = 'dist/pages/*.html',
    SRC_JS = 'src/js/*.js',
    DIST_JS = 'dist/js/*.min.js',
    TARG_JS = 'dist/js/',
    SRC_STYLE = 'src/less/**/*.less',
    SRC_MAIN_STYLE = 'src/less/style.less',
    DIST_STYLE = 'dist/css/*.min.css',
    TARG_STYLE = 'dist/css/';

gulp.task('uglifyJS', function() {
    gulp.src(SRC_JS)
        .pipe(gulp.dest(TARG_JS))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(TARG_JS));
});

gulp.task('uglifyCSS', function() {
    gulp.src(SRC_MAIN_STYLE)
		.pipe(less())
		.pipe(gulp.dest(TARG_STYLE))
        .pipe(minify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(TARG_STYLE));
});

gulp.task('wireBowerDep', function() {
    gulp.src(SRC_INDEX_HTML)
        .pipe(wiredep({
            'ignorePath' : '../'
        }))
        .pipe(gulp.dest(TARG_INDEX_HTML));
});

gulp.task('wireCustomDep', function() {
    gulp.src(DIST_INDEX_HTML)
        .pipe(inject(gulp.src([DIST_JS, DIST_STYLE], {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest(TARG_INDEX_HTML));
});

gulp.task('wireBowerDepPages', function() {
    gulp.src(SRC_PAGES_HTML)
        .pipe(wiredep())
        .pipe(gulp.dest(TARG_PAGES_HTML));
});

gulp.task('wireCustomDepPages', function() {
    gulp.src(DIST_PAGES_HTML)
        .pipe(inject(gulp.src([DIST_JS, DIST_STYLE], {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest(TARG_PAGES_HTML));
});
gulp.task('default', ['uglifyJS', 'uglifyCSS', 'wireBowerDep', 'wireCustomDep', 'wireBowerDepPages', 'wireCustomDepPages'], function() {
    gulp.watch(SRC_JS, ['uglifyJS']);
    gulp.watch(SRC_STYLE, ['uglifyCSS']);
    gulp.watch(SRC_INDEX_HTML, ['wireBowerDep']);
    gulp.watch(DIST_INDEX_HTML, ['wireCustomDep']);
    gulp.watch(SRC_PAGES_HTML, ['wireBowerDepPages']);
    gulp.watch(DIST_PAGES_HTML, ['wireCustomDepPages']);
});
