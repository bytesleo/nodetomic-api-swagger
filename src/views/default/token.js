/* global Cookies, Vue */

// Vue.js
const app = new Vue({
    el: "#app",
    data: {
        token: Cookies.get('token')
    }
});


