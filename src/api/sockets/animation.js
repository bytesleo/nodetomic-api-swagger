let socket = null;
let io = null;

// Constructor
export default (_socket, _io) => {
    socket = _socket;
    io = _io;
    on();
}

// Here should be all events 'on'
export function on() {

}

// Example emit from controllers/news.js
export function emit(data) {

    io.emit('animation', data);

}