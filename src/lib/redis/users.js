import Redis from 'redis-fast-driver';
import config from '../../config';

const r = new Redis(config.redis.users);
require('./status').default(r, config.redis.users, 'users');

// Create
export async function create(key, value) {
  try {
    let id = key.split(':')[0];
    await r.rawCall(['SET', id, value]);
  } catch (err) {
    throw `Error 1i Redis ${err}`;
  }
  return true;
}

// Get by key
export function get(key) {
  return new Promise((resolve, reject) => {
    r.rawCall([
      'get', key
    ], (err, result) => {
      if (result)
        resolve(result);
      resolve(null);
    });
  });
}

// Update by key
export function update(key, value) {
  return new Promise((resolve, reject) => {
    r.rawCall([
      'SET', key, value
    ], (err, result) => {
      if (result)
        resolve(result);
      resolve(null);
    });
  });
}

// Destroy by key
export function destroy(key) {
  return new Promise((resolve, reject) => {
    r.rawCall([
      'DEL', key
    ], (err, result) => {
      if (result)
        resolve(result);
      resolve(null);
    });
  });
}
