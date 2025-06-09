const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

const paths = {
    styles: {
        src: './src/sass/**/*.scss',
        dest: './f/css/'
    },
    scripts: {
        src: './src/js/main/*.js',
        dest: './f/js/'
    },
    plugins: {
        src: './src/js/plugins/*.js',
        dest: './f/js/'
    }
}

//Сборка, добавление префиксов и минификация main.css из папки src/sass/images/. Сохраняет в папку /f/css/.
function maincss(){
    return gulp.src('./src/sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCss())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./f/css/'))
}

//Сборка и минификация скриптов из папки src/js/main/. Сохраняет в папку /f/js/.
function scripts(){
    return gulp.src(paths.scripts.src)
        .pipe(babel({
            presets:['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest))
}

//Сборка и минификация плагин-скриптов из папки src/js/plugins/. Сохраняет в папку /f/js/.
function plugins(){
    return gulp.src(paths.plugins.src)
        .pipe(babel({
            presets:['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('plugins.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.plugins.dest))
}

//Слежение за изменениями в файлах
function watch(){
    gulp.watch(paths.styles.src, maincss)
    gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(gulp.parallel(maincss, scripts, plugins), watch)

exports.maincss = maincss
exports.scripts = scripts
exports.plugins = plugins
exports.watch = watch
exports.build = build
exports.default = build
