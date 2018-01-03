import express from 'express';
import serveIndex from 'serve-index';


const startServer = (config) => {
	const app = express();

	// Serve URLs like /ftp/thing as public/ftp/thing
	// The express.static serves the file contents
	// The serveIndex is this module serving the directory
	app.use(
		'/ftp',
		express.static(config.path),
		serveIndex(config.path, {'icons': true})
	);

	// Listen
	return app.listen(config.port);
}

export default {
	start: startServer
}
