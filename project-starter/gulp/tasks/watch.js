//--------Require---------//

let gulp = require('gulp'), //Task automation.
    watch = require('gulp-watch'), //Watches files for saved changes.
    browserSync = require('browser-sync').create(); //Sets up a server and syncs our HTML and CSS with multiple browsers. The .create() just imports the method create() rather than the whole package as that is all we need.

//--------Watch---------//

gulp.task('watch', function () {

    //Initialises browser-sync to automatically set up a local server when gulp watch is run in the command line
    browserSync.init({
        notify: false, //stops the browser-sync notification box flashing up on the screen each time you save.
        server: {
            baseDir: "app" //the path to the base directory that contains the index.html - relative to this gulpfile.js
        }
    });

    //watch all HTML files in the app directory and refresh the webpage on save
    watch('./app/*.html', function () {
        browserSync.reload();
    });

    //watch our css pages run cssInject task when changes are saved
    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject');
    });

});

//--------Define Tasks---------//

//update the css on our webpage using browser-sync but only after the 'styles' gulp task (see above) has finished running.
gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});
