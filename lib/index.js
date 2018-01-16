'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('--port', 'port number to listen on').option('--path', 'path to host root folder').parse(process.argv);

var config = {
    port: _commander2.default.port ? _commander2.default.port : 1337,
    path: _commander2.default.path ? _commander2.default.path : './'
};
var app = _server2.default.start(config);