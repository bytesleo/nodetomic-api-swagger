import redis from 'socket.io-redis';
import fs from "fs";
import config from '../../config';

const io = require('socket.io')(config.server.port + 1);
io.adapter(redis({ host: 'localhost', port: 6379 }));
const node = parseInt(process.env.NODE_APP_INSTANCE) || 0;

// Scan events

const pathSocket = `${config.base}/api/sockets`;
let events = [];
fs.readdirSync(pathSocket).forEach(path => {
    events.push(`${pathSocket}/${path}`);
});


io.on('connection', function (socket) {

    console.log(`Socket Connected - node - ${node}`);
    // Autoload sockets
    events.forEach(path => require(path).default(socket, io));
});


