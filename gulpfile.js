var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();

var folder = 'calenda';

gulp.task('browserSync', async function() {
  browserSync.init({
    server: {
      baseDir: folder
    },
  })
})

gulp.task('sass', async function() {
  return gulp.src( folder +'/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest( folder + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', gulp.series('browserSync', 'sass', async function (){
  gulp.watch( folder + '/scss/**/*.scss', gulp.series('sass')); 
  gulp.watch( folder + '/*.html').on('change', browserSync.reload); 
  gulp.watch( folder + '/js/**/*.js').on('change', browserSync.reload);  
  gulp.watch( folder +'/css/**/*.css').on('change', browserSync.reload); 
}));