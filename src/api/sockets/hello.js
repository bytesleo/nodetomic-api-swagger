let socket;
let io;

// Constructor
export default (_socket, _io) => {
    socket = _socket;
    io = _io;
    on();
}


// Here should be all events 'on'
export function on() {

    socket.on('hello:add', function (data) {
        io.emit('add', data);
    });

    socket.on('hello:delete', function (data) {
        io.emit('delete', data);
    });


}

// You can emit from controllers/hello.js
export function emit(data) {

    io.emit('other event', data);

}