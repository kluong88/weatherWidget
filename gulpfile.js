const gulp = require(`gulp`);
const cleanCSS = require(`gulp-clean-css`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);

function compressCSS() {
  return gulp.src(`src/css/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(`dist/css`));
}

function compressJS() {
  return gulp.src(`src/js/*.js`)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest(`dist/js`));
}
exports.default = function() {
  gulp.watch(`src/css/*.css`, compressCSS);
  gulp.watch(`src/js/*.js`, compressJS);
}