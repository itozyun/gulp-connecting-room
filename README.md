# gulp-connecting-room

![](connecting-room.jpg)

[Image source:TBS NEWS23](https://togetter.com/li/1467820)

It allows you to write constants that are shared by JavaScript and SCSS in gulpfile.js.

## Usage

~~~js

const connect = require('gulp-connection-room');
const COMMON_VARS = {
          BORDER_WIDTH : 2,
          TEXT_COLOR   : '#111',
      };

gulp.task(
    'build',
    gulp.series(
        function(){
            return gulp.src(['src/js/*.js'])
                .pipe(connect(COMMON_VARS))
                .pipe(concat('main.js'))
                .pipe(jsCompiler)
                .pipe(gulp.dest('output'));
        },
        function(){
            return gulp.src(['src/scss/*.scss'])
                .pipe(connect(COMMON_VARS))
                .pipe(concat('main.css'))
                .pipe(scss)
                .pipe(gulp.dest('output'));
        }
    )
);

~~~

## License

gulp-connecting-room is licensed under [Apache License 2.0](https://github.com/googlearchive/code-prettify/blob/master/COPYING)

(C) 2023 [itozyun](https://github.com/itozyun)([outcloud.blogspot.com](//outcloud.blogspot.com/))