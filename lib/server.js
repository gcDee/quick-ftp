'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _xftp = require('xftp');

var _xftp2 = _interopRequireDefault(_xftp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startServer = function startServer(config) {
	var path = config.path,
	    port = config.port;

	console.log(process.pwd);
	console.log(process.cwd());
	return _xftp2.default.createServer({
		auth: function auth() {},
		put: function put(filename, stream) {
			return stream.pipe(_fs2.default.createWriteStream(filename));
		},
		get: function get(filename) {
			return _fs2.default.createReadStream(filename);
		},
		cwd: './'
	}).listen({
		host: '0.0.0.0',
		port: port
	}, function (err) {
		return err ? console.log(err.message) : console.log('Server listening on port ' + port);
	});
};

exports.default = {
	start: startServer
};