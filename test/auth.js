const request = require("request");
const chalk = require('chalk');
let n = 0;
let roles = ['admin','user'];

console.log(chalk.cyan(`Testing Auth...`));

setInterval(function() {
  var options = {
    method: 'POST',
    url: 'http://localhost:8000/auth/local',
    headers: {
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
}, 50);
