import ftpd from 'ftp-server';

const startServer = (config) => {
	const { path, port } = config;

	ftpd.fsOptions.root = path;
	return ftpd.listen(port, '0.0.0.0');
};

export default {
	start: startServer
};
