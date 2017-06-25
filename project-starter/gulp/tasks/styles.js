//--------Require---------//

let gulp = require('gulp'), //Task automation.
    postcss = require('gulp-postcss'), //CSS pre-processor with modular extensibiity.
    autoprefixer = require('autoprefixer'), //Postcss package to auto prefix just the compiled css document.
    cssvars = require('postcss-simple-vars'), //Postcss package to allow the use of variables.
    nested = require('postcss-nested'), //Postcss package to allow nested css - by using '&' it will compile to non-ancestral css.
    cssImport = require('postcss-import'), //Postcss package that will compile all our @imports allowing lots of separate css files for development but still only 1 css file for the live site.
    mixins = require('postcss-mixins');


//--------Define Tasks---------//

//Compile our css via the postcss pipe running through the filters(packages) detailed in the [] brackets.
gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .on('error', function (errorInfo) { //this on error function prevents gulp watch from stopping running every time an error is made e.g. mis-spelling a variable name.
            console.log(errorInfo.toString()); //this makes the error message still appear in the console to help the developer with debugging.
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});
