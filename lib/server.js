'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ftpServer = require('ftp-server');

var _ftpServer2 = _interopRequireDefault(_ftpServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startServer = function startServer(config) {
	var path = config.path,
	    port = config.port;


	_ftpServer2.default.fsOptions.root = path;
	return _ftpServer2.default.listen(port, '0.0.0.0');
};

exports.default = {
	start: startServer
};