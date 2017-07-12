// import * as Redis from 'redis';
import Thorken from 'thorken';
//

// import Promise from 'bluebird';
// import * as utility from '../utility';
import config from '../../config';

// Promise.promisifyAll(Redis);

// require('redis-delete-wildcard')(Redis);

// const db = Redis.createClient({url: config.redis.token.uri});

// require('./status').default(db, config.redis.token.uri);


const session = new Thorken({
  jwtSecret: config.secret,
  // [namespace]: 'ts',
  // redis: db,
  cleanupManual: false
})

// console.log(session);

// export function set(key, ttl, value) {
//
//   value.ttl = {
//     assigned: ttl,
//     created: value.ts || (new Date().getTime())
//   }
//   let dataEncrypt = utility.encrypt(JSON.stringify(value));
//   return db.setexAsync(key, ttl, dataEncrypt);
//
// }

// export function get(key) {
//
//   return db.getAsync(key);
//
// }

// export function remove(key) {
//
//   return db.delAsync(key);
//
// }

// export function findAndRemoveById(key) {
//
//   let id = key.split(':')[0];
//   db.delwild(`${id}:*`, (err, res) => {
//     if(err)
//       console.log(err);
//     console.log('sessions deleted-> ', res);
//   });

// }
