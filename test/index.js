import http from 'http';
import assert from 'assert';
import request from 'request';
import config from '../src/config';

describe('Server', () => {

  const host = `http://${config.server.ip}:${config.server.port}`;

  it('host should return 200', done => {
    http.get(host, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('/hello/all should return 200', done => {
    http.get(host + '/api/hello', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('/user/me should return 403', done => {
    http.get(host + '/api/user/me', res => {
      assert.equal(403, res.statusCode);
      done();
    });
  });


  it('/auth/local should return 200', done => {

    let roles = ['admin', 'user'];
    let options = {
      method: 'POST',
      url: `${host}/auth/local`,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        username: roles[Math.round(Math.random())],
        password: '123'
      }
    };
    request(options, function (error, res, body) {
      if (error)
        throw new Error(error);

      assert.equal(200, res.statusCode);
      done();
    });

  });

});
