const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps'); //requere sourcemaps, pacote para mapear o código original
                                               //no código trasnpilado ou minificado.
const uglify = require('gulp-uglify');//requere uglify, pacote para minificacao do js
const obfuscate = require('gulp-obfuscate');//requere obfuscate, pacote para deixar o js ilegivel
const imageMin = require ('gulp-imagemin');//requere imagemin, minificador de imagens

//funcao imagemin
function comprimeImagens() {
    return gulp.src('./source/images/*')//seleciona todas imagens
    .pipe(imageMin())//chama o imagemin
    .pipe(gulp.dest('./build/images'))//determina destino das imgs minificadas
}

//funcao de minificacao do js usando uglify
function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js') //seleciona todos os arquivos js
        .pipe(uglify()) //chama o uglify, deixando o código js menor
        .pipe(obfuscate()) // chama obfuscate, deixando codigo js ilegivel 
        .pipe(gulp.dest('./build/scripts')) //determina o destino dos arquivos pós uglify
}

//função para compilar  SASS
//NAO POSSUI CALLBACK PQ TEM RETURN
function compilaSass() {
    return gulp.src('./source/styles/main.scss') //SELECIONA O ARQUIVO main.scss
        .pipe(sourceMaps.init())//inicia o sourcemaps
        .pipe(sass({
            outputStyle: 'compressed'
        }))  //RODA A COMPILAÇÃO SASS NESSE ARQUIVO
        .pipe(sourceMaps.write('./maps'))//define caminho para os arquivos de mapeamento
        .pipe(gulp.dest('./build/styles')) //DEFINE UMA PASTA DESTINO PARA ARQUIVOS COMPILADOS
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript));
}
