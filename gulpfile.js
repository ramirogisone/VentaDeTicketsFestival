const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Funcion para compilar SASS

const paths = {
	imagenes: 'src/img/**/*',
	scss: 'src/scss/**/*.scss',
	js: 'src/js/**/*.js',
}

function css( done ) {
	return src(paths.scss)
		.pipe( sass({
			outputStyle: 'expanded'
		}) )
		.pipe( dest('./build/css') )
}

function minificarcss() {
	return src(paths.scss)
		.pipe( sass({
			outputStyle: 'compressed'
		}) )
		.pipe( dest('./build/css') )
}

function javascript() {
	return src(paths.js)
	.pipe( concat('bundle.js') )
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
exports.minificarcss = minificarcss;
// exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos );
