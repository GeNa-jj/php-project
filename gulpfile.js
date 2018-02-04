//模块：函数|对象
var gulp = require('gulp');


//sass转换css
var sass = require('gulp-sass');
gulp.task('compileSass',function(){
    gulp.src('./src/sass/*.scss')

    .pipe(sass({outputStyle:'expanded'})).on('error',sass.logError)

    .pipe(gulp.dest('./src/css/'))
});

//压缩js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
gulp.task('mergeJs',function(){
    gulp.src(['./src/js/*.js','!./src/js/{all,all.min}.js'])

    .pipe(concat('all.js'))

    .pipe(gulp.dest('./src/js/'))

    .pipe(babel({
        presets: ['es2015']
    }))

    .pipe(uglify())

    .pipe(rename({suffix:'.min'}))

    .pipe(gulp.dest('./src/js/'));

});

gulp.task('watch',function(){
    gulp.watch('./src/sass/*.scss',['compileSass']);
});

//自动刷新页面
var browserSync = require('browser-sync');
gulp.task('serverJt',function(){
    browserSync({

        // server:'./src/',

        port:1000,

        //能识别PHP，也能自动刷新页面,记得注释掉（server:'./src/',）
        proxy:'http://localhost:10000',

        files:['./src/**/*.html','./src/**/*.css']
    });

    gulp.watch('./src/sass/*.scss',['compileSass']);
});