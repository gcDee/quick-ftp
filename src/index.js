import server from './server';
import program from 'commander';

program
    .option('--port', 'port number to listen on')
    .option('--path', 'path to host root folder')
    .parse(process.argv);

const config = {
    port: program.port ? program.port : 1337,
    path: program.path ? program.path : '~/'
};
const app = server.start(config);
