import pkg from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import prefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import svgSprite from 'gulp-svg-sprite';
import include from 'gulp-include';

const { src, dest, watch, parallel, series } = pkg;
const scss = gulpSass(sass);

export function pages() {
  return src('src/pages/*.html')
    .pipe(
      include({
        includePaths: 'src/components',
      })
    )
    .pipe(dest('src'))
    .pipe(browserSync.stream());
}

export function sprite() {
  return src('src/assets/dist/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
            example: true,
          },
        },
      })
    )
    .pipe(dest('src/assets/dist'));
}

export function images() {
  return src(['src/assets/*.*', '!src/assets/*.svg'])
    .pipe(newer('src/assets/dist'))

    .pipe(src('src/assets/*.*'))
    .pipe(newer('src/assets/dist'))
    .pipe(webp())

    .pipe(src('src/assets/*.*'))
    .pipe(newer('src/assets/dist'))
    .pipe(imagemin())

    .pipe(dest('src/assets/dist'));
}

export function styles() {
  return src([
    'src/scss/*',
    'src/scss/app.scss',
  ])
    .pipe(
      prefixer({
        overrideBrowsersList: ['last 10 version'],
        cascade: false,
      })
    )
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}

export function scripts() {
  return src([
    'src/js/*.js',
    '!src/js/main.min.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

export function watcher() {
  browserSync.init({
    server: {
      baseDir: 'src/',
    },
  });
  watch(['src/scss/*.*'], styles);
  watch(['src/scss/*/*.*'], styles);
  watch(['src/assets'], images);
  watch(['src/js/*.js', '!src/js/main.min.js'], scripts);
  watch(['src/components/*', 'src/pages/*'], pages);
  watch(['src/*.html']).on('change', browserSync.reload);
}

export function cleanBuild() {
  return src('build').pipe(clean());
}

export function builder() {
  return src(
    [
      'src/**/*.html',
      'src/css/style.min.css',
      'src/js/main.min.js',
      'src/assets/dist/*.*',
      '!src/assets/dist/*.svg',
      'src/assets/dist/sprite.svg',
    ],
    {
      base: 'src',
    }
  ).pipe(dest('build'));
}

export const build = series(cleanBuild, builder);
// export const build = series(builder);

export default parallel(styles, images, scripts, pages, watcher);
