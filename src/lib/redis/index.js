import Redis from 'redis-fast-driver';
import config from '../../config';

const r = new Redis({
  //host: '/tmp/redis.sock', //unix domain
  host: '127.0.0.1', //can be IP or hostname
  port: 6379,
  maxretries: 10, //reconnect retries, default 10
  //auth: '123', //optional password, if needed
  //db: 5, //optional db selection
});

require('./status').default(r, config.redis.token.uri);

//Create / update

export async function create(key, data, ttl) {

  try {
    if (!config.redis.token.multiple)
      await destroyMultiple(key.split(':')[0]);
    if (ttl) {
      await r.rawCall(['SETEX', key, ttl, data]);
    } else {
      await r.rawCall(['SET', key, data]);
    }
  } catch (err) {
    throw `Error 1 Redis ${err}`;
  }
  return true;
}


//Get by id

export function get(id) {

  return new Promise((resolve, reject) => {
    r.rawCall([
      'get', id
    ], (err, result) => {

      if (result)
        resolve(result);
      resolve(null);
    });
  });

}

//Get ttl

export function ttl(id) {

  return new Promise((resolve, reject) => {
    r.rawCall([
      'ttl', id
    ], (err, result) => {

      if (result)
        resolve(result);
      resolve(null);
    });
  });

}

//Destroy by id

export function destroy(id) {

  return new Promise((resolve, reject) => {
    r.rawCall([
      'DEL', id
    ], (err, result) => {

      if (result)
        resolve(result);
      resolve(null);
    });
  });

}

//Destroy multiple by pattern

export function destroyMultiple(id) {

  return new Promise((resolve, reject) => {
    r.rawCall([
      'KEYS', `${id}:*`
    ], (err, keys) => {

      keys.join();
      keys.splice(0, 0, "DEL");

      r.rawCall(keys, (err, result) => {
        if (result)
          resolve(result);
        resolve(null);
      })

    });
  });

}
