/* global io, location, Cookies, alert, document, Vue, VueRouter */

// Config
const host = location.origin;
const port = parseInt(host.split(':').reverse()[0]);
const hostSocket = host.replace(port, port + 1);

// Socket.io
const socket = io.connect(hostSocket, {
  'transports': ['websocket', 'polling']
});

// Vue.js

const home = {
  template: '<div class="text-center"><div class="project">API</div><div class="link-docs"><a href="/docs">Swagger Here!</a></div></div>'
}

const token = {
  template: '<div class="token"><div>Token</div><textarea class="form-control">' + Cookies.get('token') + '</textarea></div>'
}

const routes = [
  {
    path: '/',
    component: home
  }, {
    path: '/token',
    component: token
  }
]

const router = new VueRouter({ routes: routes })

const app = new Vue({
  el: "#app",
  router: router,
  data: {
    logo: 'rubberBand',
    igreet: '',
    ilanguage: '',
    greets: []
  },
  created: function () {
    this.getHello();
  },
  methods: {
    getHello: function () {
      this.$http.get(host + '/api/hello').then(response => {
        this.greets = response.body;
      }, response => {
        alert('error :(')
      });
    },
    addHello: function () {
      this.$http.post(host + '/api/hello', { greet: this.igreet, language: this.ilanguage }).then(response => {
        this.igreet = this.ilanguage = '';
        socket.emit('hello:add', response.body);
      }, response => {
        alert('error :(')
      });
    },
    deleteHello: function (id) {
      this.$http.delete(host + '/api/hello/' + id).then(response => {
        socket.emit('hello:delete', { _id: id });
      }, response => {
        alert('error :(')
      });
    }
  }
});

socket.on('add', function (data) {
  app.greets.push(data);
});

socket.on('delete', function (data) {
  app.greets.forEach(element => {
    if (element._id === data._id) {
      let index = app.greets.indexOf(element);
      app.greets.splice(index, 1);
    }
  });
});

// Animation

const logo = document.getElementById("logo");

logo.addEventListener("animationend", function () {
  app.logo = '';
});

socket.on('animation', function (data) {
  console.log('from socket :D', data);
  app.logo = data;
});

