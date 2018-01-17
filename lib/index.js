'use strict';

require('babel-register');

var _simpleFtp = require('simple-ftp');

var _simpleFtp2 = _interopRequireDefault(_simpleFtp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('./package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var program = _commander2.default.version(_package.version).usage('root [options...]').option('--port [port]', 'set port', function (n) {
    return parseInt(n, 10);
}).option('--host [ipv4]', 'set host').option('--read-only [bool]', 'set read only mode', function (v) {
    return !(v === 'false' || v === 'no');
}).parse(process.argv);

var readOnly = !(program.readOnly === false);

var opts = {
    root: program.args[0] || process.cwd(),
    readOnly: readOnly,
    host: program.host || '127.0.0.1',
    port: program.port || 1337,
    maxConnections: program.maxConnections || 10
};

console.log(' - starting %s ftp server on %s', readOnly ? chalk.green('read only') : chalk.red('full access'), chalk.magenta(opts.root));

var server = (0, _simpleFtp2.default)(opts, function (session) {
    session.on('pass', function (username, password, cb) {
        cb(); // LET EVERYBODY IN
    });

    session.on('read', function (pathName, offset, cb) {
        cb(null, _fs2.default.createReadStream(pathName, { start: offset }));
    });

    session.on('write', function (pathName, offset, cb) {
        cb(null, _fs2.default.createWriteStream(pathName, { start: offset }));
    });

    session.on('stat', _fs2.default.stat);
    session.on('readdir', _fs2.default.readdir);
    session.on('mkdir', _fs2.default.mkdir);
    session.on('unlink', _fs2.default.unlink);
    session.on('remove', _fs2.default.remove);
    session.on('rename', _fs2.default.rename);
});

server.on('listening', function () {
    console.log(' - listening on %s:%s', chalk.blue(opts.host), chalk.yellow(opts.port));
});

server.on('connection', function (socket) {
    var remoteAddress = socket.remoteAddress,
        remotePort = socket.remotePort;

    console.log(' - received connection from %s:%s', chalk.blue(remoteAddress), chalk.yellow(remotePort));

    socket.on('end', function () {
        console.log(' - client %s:%s disconnected', chalk.blue(remoteAddress), chalk.yellow(remotePort));
    });
});