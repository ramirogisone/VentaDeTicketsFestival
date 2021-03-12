const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Utilidades para CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades para JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

// Funcion para compilar SASS

const paths = {
	imagenes: 'src/img/**/*',
	scss: 'src/scss/**/*.scss',
	js: 'src/js/**/*.js',
}

function css( done ) {
	return src(paths.scss)
		.pipe (sourcemaps.init())
		.pipe( sass() )
		.pipe( postcss([autoprefixer(), cssnano()]) )
		.pipe (sourcemaps.write('.'))
		.pipe( dest('./build/css') )
}

function javascript() {
	return src(paths.js)
	.pipe(sourcemaps.init())
	.pipe( concat('bundle.js') )
	.pipe( terser( ) )
	.pipe( sourcemaps.write('.'))
	.pipe( rename( { suffix: '.min '}))
	.pipe( dest('./build/js') )
}

function imagenes() {
	return src(paths.imagenes)
	.pipe( imagemin() )
	.pipe( dest( './build/img'))
	.pipe( notify({message: 'Imagen minificada'}) );
}

function versionWebp() {
	return src(paths.imagenes)
	.pipe( webp() )
	.pipe( dest( './build/img'))
	.pipe( notify({message: 'Version webP lista'}) );
}


function watchArchivos() {
	watch( paths.scss, css );
	watch( paths.js, javascript );
}

exports.css = css;
// exports.javascript = javascript;
exports.imagenes = imagenes;
// exports.versionWebp = versionWebp;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos );
