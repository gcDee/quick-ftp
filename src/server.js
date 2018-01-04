import ftp from 'xftp';
import fs from 'fs';

const startServer = (config) => {
	const { path, port } = config;
	console.log(process.pwd);
	console.log(process.cwd());
	return ftp.createServer({
		auth: () => {},
		put: (filename, stream) => stream.pipe(fs.createWriteStream(filename)),
		get: (filename) => fs.createReadStream(filename),
		cwd: './'
	})
	.listen({
		host: '0.0.0.0',
		port: port
	},err => err
		? console.log(err.message)
		: console.log(`Server listening on port ${port}`)
	);
};

export default {
	start: startServer
};
