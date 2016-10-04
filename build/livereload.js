(function () {
    'use strict';

    const chokidar = require('chokidar');
    const server = require('node-livereload').createServer();

    chokidar.watch('./dist').on('all', (type, path) => {
        server.reloadBrowser([path]);
    });
}());