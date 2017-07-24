// Redis Cleaner when deleting or expiring keys

import Redis from 'redis-fast-driver';
import chalk from 'chalk';
import config from '../config';

// Pub/Sub (sessions)
const subS = new Redis(config.redis.rs);
const pubS = new Redis(config.redis.rs);

// Pub/Sub (users)
const subU = new Redis(config.redis.ru);
const pubU = new Redis(config.redis.ru);

// Sessions
subS.rawCall([
  'subscribe', `__keyevent@${config.redis.rs.db}__:del`, `__keyevent@${config.redis.rs.db}__:expired`
], async function(e, data) {
  let id = extract(data);
  if (id) {
    id = id.split(':')[0];
    pubS.rawCall([
      'keys', `${id}:*`
    ], (err, result) => {
      if (result.length === 0) {
        pubU.rawCall([
          'DEL', id
        ], (err, result) => {
          if (result)
            console.log(chalk.blueBright(`deleted user from redis ${id} - ${result}`));
          }
        );
      }
    });
  }
});

// Users
subU.rawCall([
  'subscribe', `__keyevent@${config.redis.ru.db}__:del`
], async function(e, data) {
  let id = extract(data);
  if (id) {
    pubS.rawCall([
      'KEYS', `${id}:*`
    ], (e, keys) => {
      if (keys.length > 0) {
        keys.join();
        keys.splice(0, 0, "DEL");
        pubS.rawCall(keys, (e, result) => {
          if (result)
            console.log(chalk.blueBright(`deleted sessions from redis ${id} - ${result}`));
          }
        );
      }
    });
  }
});

// Format event
function extract(data) {
  if (data[0] === 'message') {
    return data.reverse()[0];
  } else {
    console.log(chalk.magentaBright(`${data}`));
  }
}
