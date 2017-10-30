let gulp   = require('gulp'),
    ghost  = require('ghost'),
    path   = require('path');

gulp.task('ghost:start', function (callback) {
    let g = ghost({
        config: path.join(__dirname, '../ghost-dev-config.js')
    });

    g.then(function (ghostServer) {
        ghostServer.start();
    });

    callback();
});
