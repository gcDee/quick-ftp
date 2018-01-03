import server from './server.js';

const app = server.start({
    port: 4000,
    path: './'
});
