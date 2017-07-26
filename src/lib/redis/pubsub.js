import Redis from 'redis-fast-driver';
import chalk from 'chalk';
import config from '../../config';

const pubsub = new Redis(config.redis.sessions);
require('./status').default(pubsub, config.redis.sessions, 'pubsub');

const node = process.env.NODE_APP_INSTANCE || 0;

// observer
export async function observer(key) {

  // 'subscribe', `__keyevent@${config.redis.sessions.db}__:del`, `__keyevent@${config.redis.sessions.db}__:expired`
  // 'psubscribe', `__key*__:${key}:*`

  pubsub.rawCall([
    'psubscribe', `__key*__:${key}`
  ], async function(e, data) {
    // key, action, id
    let obj = get(data);
    if (obj) {
      switch (obj.action) {
        case 'expired':
          console.log(chalk.blueBright(`expired ${obj.key} - node = ${node}`));
          break;
        case 'del':
          console.log(chalk.blueBright(`del ${obj.key} - node = ${node}`));
          break;
        default:
          break;
      }
    } else {
      console.log(chalk.blueBright(`${data} - node = ${node}`));
    }
  });
}

// Format event
function get(data) {
  if (data[0] === 'pmessage') {
    let key = data[1].split('__key*__:')[1];
    let id = key.split(':')[0];
    let action = data.reverse()[0];
    return {key, action, id};
  } else {
    return null;
  }
}
