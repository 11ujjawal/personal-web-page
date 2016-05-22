var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    minify = require('gulp-clean-css'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream;

var SRC_HTML = 'src/index.html',
	DIST_HTML = 'dist/index.html',
    TARG_HTML = 'dist/',
    SRC_JS = 'src/js/*.js',
    TARG_JS = 'dist/js/',
	DIST_JS = 'dist/js/*.min.js',
    SRC_STYLE = 'src/less/*.less',
    TARG_STYLE = 'dist/css/',
	DIST_STYLE = 'dist/css/*.min.css';

gulp.task('uglifyJs', function() {
    gulp.src(SRC_JS)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(TARG_JS));
});

gulp.task('uglifyStyle', function() {
    gulp.src(SRC_STYLE)
        .pipe(less())
        .pipe(minify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(TARG_STYLE));
});

gulp.task('wireBowerDep', function() {
    gulp.src(SRC_HTML)
        .pipe(wiredep())
        .pipe(gulp.dest(TARG_HTML));
});

gulp.task('wireCustomDep', function() {
    gulp.src(DIST_HTML)
        .pipe(inject(gulp.src([DIST_JS, DIST_STYLE], {read: false})))
        .pipe(gulp.dest(TARG_HTML));
});

gulp.task('default', function() {
    gulp.watch(SRC_JS, ['uglifyJs']);
    gulp.watch(SRC_STYLE, ['uglifyStyle']);
    gulp.watch(SRC_HTML, ['wireBowerDep']);
	gulp.watch(DIST_HTML, ['wireCustomDep']);
});
