import { FTPServer } from 'ftpd';

const options = {
    host: process.env.IP || '127.0.0.1',
    port: process.env.PORT || 7002,
    tls: null,
};

const server = new FTPServer(options.host, {
    getInitialCwd: () => {
        return '/';
    },
    getRoot: () => {
        return process.cwd();
    },
    pasvPortRangeStart: 1025,
    pasvPortRangeEnd: 1050,
    tlsOptions: options.tls,
    allowUnauthorizedTls: true,
    useWriteFile: false,
    useReadFile: false,
    uploadMaxSlurpSize: 7000, // N/A unless 'useWriteFile' is true.
});

server.on('error', () => console.log('FTP Server Error', error));

server.on('client:connected', () => {
    
})
