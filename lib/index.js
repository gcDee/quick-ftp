'use strict';

var _ftpd = require('ftpd');

var options = {
    host: process.env.IP || '127.0.0.1',
    port: process.env.PORT || 7002,
    tls: null
};

var server = new _ftpd.FTPServer(options.host, {
    getInitialCwd: function getInitialCwd() {
        return '/';
    },
    getRoot: function getRoot() {
        return process.cwd();
    },
    pasvPortRangeStart: 1025,
    pasvPortRangeEnd: 1050,
    tlsOptions: options.tls,
    allowUnauthorizedTls: true,
    useWriteFile: false,
    useReadFile: false,
    uploadMaxSlurpSize: 7000 // N/A unless 'useWriteFile' is true.
});

server.on('error', function () {
    return console.log('FTP Server Error', error);
});

server.on('client:connected', function () {});