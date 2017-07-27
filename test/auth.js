const request = require("request");
let n = 0;
let roles = ['admin','user'];

console.log(`Testing Auth...`);

setInterval(function() {
  var options = {
    method: 'POST',
    url: 'http://localhost:8000/auth/local',
    headers: {
      'postman-token': '7adf01b2-9d2e-0bb4-38b9-037fa55f472b',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      username: roles[Math.round(Math.random())],
      password: '123'
    }
  };
  request(options, function(error, response, body) {
    if (error)
      throw new Error(error);
    // n++
    //console.log(`#${n} - ${body}`);
  });
}, 30);
