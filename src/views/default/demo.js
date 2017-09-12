'use strict';
/* global io, location, alert, document, Vue */

// Config
var host = location.origin;
var url = parseInt(host.split(':').reverse()[0]);
var hostSocket = host.replace(url, 8001);

// Socket.io
var socket = io.connect(hostSocket, {
    'transports': ['websocket', 'polling']
});

// Vue.js
var app = new Vue({
    el: "#app",
    data: {
        logo: 'rubberBand',
        igreet: '',
        ilanguage: '',
        greets: []
    },
    created: function created() {
        this.getHello();
    },
    methods: {
        getHello: function getHello() {
            var _this = this;

            this.$http.get(host + '/api/hello').then(function (response) {
                _this.greets = response.body;
            }, function (response) {
                alert('error :(');
            });
        },
        addHello: function addHello() {
            var _this2 = this;

            this.$http.post(host + '/api/hello', { greet: this.igreet, language: this.ilanguage }).then(function (response) {
                _this2.igreet = _this2.ilanguage = '';
                socket.emit('hello:add', response.body);
            }, function (response) {
                alert('error :(');
            });
        },
        deleteHello: function deleteHello(id) {
            this.$http.delete(host + '/api/hello/' + id).then(function (response) {
                socket.emit('hello:delete', { _id: id });
            }, function (response) {
                alert('error :(');
            });
        }
    }
});

socket.on('add', function (data) {
    app.greets.push(data);
});

socket.on('delete', function (data) {
    app.greets.forEach(function (element) {
        if (element._id === data._id) {
            var index = app.greets.indexOf(element);
            app.greets.splice(index, 1);
        }
    });
});

// Animation
var logo = document.getElementById("logo");

logo.addEventListener("animationend", function () {
    app.logo = '';
});

socket.on('animation', function (data) {
    console.log('from socket :D', data);
    app.logo = data;
});