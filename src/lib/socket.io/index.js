import Redis from 'socket.io-redis';
import chalk from 'chalk';
import fs from "fs";
import config from '../../config';

const io = require('socket.io')(config.server.port + 1);
io.adapter(Redis(config.redis.sockets.conn));

// Scan events
const pathSocket = `${config.base}/api/sockets`;
let events = [];
fs.readdirSync(pathSocket).forEach(path => {
    events.push(`${pathSocket}/${path}`);
});

// Instance
const node = parseInt(process.env.NODE_APP_INSTANCE) || 0;

// Init
io.on('connection', socket => {

    if (config.log) {
        console.log(chalk.magentaBright(`Socket connected - node = ${node}`));
        total();
    }

    // Autoload sockets
    events.forEach(path => require(path).default(socket, io));

    socket.on('disconnect', () => {
        if (config.log) {
            console.log(chalk.magentaBright(`Socket disconnect - node = ${node}`));
            total();
        }
    });

});

// Total socket clients
function total() {
    io.of('/').adapter.clients((err, clients) => {
        console.log(chalk.magentaBright(`Socket total clients = ${clients.length}`));
    });
}

