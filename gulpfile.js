const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const cleanDev = () => {
  return del(['dev'])
}

const cleanBuild = () => {
  return del(['build'])
}

const resourcesDev = () => {
  return src('src/resources/**')
    .pipe(dest('dev'))
}

const resourcesBuild = () => {
  return src('src/resources/**')
    .pipe(dest('build'))
}

const stylesForDev = () => {
  return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev'))
    .pipe(browserSync.stream())
}

const stylesForBuild = () => {
  return src('src/css/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCss({
      level: 2
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const htmlMinifyBuild = () => {
  return src ('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

const htmlMinifyDev = () => {
  return src ('src/**/*.html')
    .pipe(dest('dev'))
    .pipe(browserSync.stream())
}

const scriptsForBuild = () => {
  return src([
    'src/js/**/*.js',
    'src/js/main.js'
  ])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(dest('build'))
  .pipe(browserSync.stream())
}

const scriptsForDev= () => {
  return src([
    'src/js/**/*.js',
    'src/js/main.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(sourcemaps.write())
  .pipe(dest('dev'))
  .pipe(browserSync.stream())
}

const imagesBuild = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.jpeg',
      'src/images/**/*.png',
      'src/images/*.svg',
    ])
    .pipe(image())
    .pipe(dest('build/images'))
}

const imagesDev = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.jpeg',
      'src/images/**/*.png',
      'src/images/svg/*.svg',
    ])
    .pipe(image())
    .pipe(dest('dev/images'))
}

const watchFilesBuild = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
}

const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    }
  })
}

watch('src/**/*.html', htmlMinifyDev)
watch('src/**/*.html', htmlMinifyBuild)
watch('src/css/**/*.css', stylesForDev)
watch('src/css/**/*.css', stylesForBuild)
watch('src/js/**/*.js', scriptsForDev)
watch('src/js/**/*.js', scriptsForBuild)
watch('src/resources/**', resourcesDev)
watch('src/resources/**', resourcesBuild)

exports.stylesForDev = stylesForDev
exports.stylesForBuild = stylesForBuild
exports.cleanDev = cleanDev
exports.cleanBuild = cleanBuild
exports.scriptsForDev = scriptsForDev
exports.scriptsForBuild = scriptsForBuild
exports.htmlMinifyBuild = htmlMinifyBuild
exports.htmlMinifyDev = htmlMinifyDev
exports.dev = series (cleanDev, htmlMinifyDev, resourcesDev, stylesForDev, imagesDev, watchFilesDev);
exports.build = series (cleanBuild, resourcesBuild, htmlMinifyBuild, scriptsForBuild, stylesForBuild, imagesBuild, watchFilesBuild);
