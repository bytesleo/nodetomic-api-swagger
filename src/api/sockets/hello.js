export let socket = null;
export let io = null;

// Constructor
export default (_socket, _io) => {
    socket = _socket;
    io = _io;
    on();
}

// Here should be all events 'on'
export function on() {
    socket.on('hello:add', function (data) {
        emit('add', data);
    });
    socket.on('hello:delete', function (data) {
        emit('delete', data);
    });
}

// You can emit from controllers/hello.js, example:
// - import { emit } from '../sockets/hello';
// - emit('hello','world');

export function emit(event, data) {
    io.emit(event, data);
}