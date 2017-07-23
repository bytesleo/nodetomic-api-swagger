import Redis from 'redis-fast-driver';
import config from '../../config';

const r = new Redis(config.redis.rs);
require('./status').default(r, config.redis.rs, 'rs');

// Create
export async function create(key, value, ttl) {
  try {
    let id = key.split(':')[0];
    if (!config.redis.multiple)
      await destroyMultiple(id);
    if (ttl) {
      await r.rawCall(['SETEX', key, ttl, value]);
    } else {
      await r.rawCall(['SET', key, value]);
    }
  } catch (err) {
    throw `Error 1 Redis ${err}`;
  }
  return true;
}

// exits by key
export function exits(key) {
  return new Promise((resolve, reject) => {
    r.rawCall([
      'EXISTS', key
    ], (err, result) => {
      if (result)
        resolve(result);
      resolve(null);
    });
  });
}

// Get ttl by Key
export function ttl(key) {
  return new Promise((resolve, reject) => {
    r.rawCall([
      'ttl', key
    ], (err, result) => {
      if (result)
        resolve(result);
      resolve(null);
    });
  });
}

// Get values by Pattern
export function getValuesByPattern(pattern) {
  return new Promise((resolve, reject) => {
    r.rawCall([
      'keys', `${pattern}:*`
    ], (err, keys) => {
      let query = ['MGET'].concat(keys);
      r.rawCall(query, (err, result) => {
        if (result)
          resolve(result);
        resolve(null);
      })
    });
  });
}

// Get count by Pattern
export function getCountByPattern(pattern) {
  return new Promise((resolve, reject) => {
    r.rawCall([
      'keys', `${pattern}:*`
    ], (err, result) => {
      if (result)
        resolve(result.length);
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

// Destroy multiple by key
export function destroyMultiple(key) {
  return new Promise((resolve, reject) => {
    r.rawCall([
      'KEYS', `${key}:*`
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
