const host = location.origin;

const home = {
  template: '<div><div class="project">API</div><div class="docs"><a href="/docs">Docs Here!</a></div></div>'
}

const token = {
  template: '<div class="token"><div>Token</div><textarea>' + Cookies.get('token') + '</textarea></div>'
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

const router = new VueRouter({routes: routes})

const app = new Vue({router}).$mount('#app')
