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

}

// Example emit from controllers/news.js
export function emit(data) {

    io.emit('shake', data);

}

// list all clients
/*export function getClients() {
    io.of('/').adapter.clients(function (err, clients) {
        console.log(clients);
    });
}*/