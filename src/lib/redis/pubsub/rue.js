import Redis from 'redis-fast-driver';
import chalk from 'chalk';
import config from '../../../config';
import {destroyMultiple as rsDestroy} from '../rs';

const r = new Redis(config.redis.ru);
require('../status').default(r, config.redis.ru, 'rsu');

// If deleted any key in RS
r.rawCall([
  'subscribe', `__keyevent@${config.redis.ru.db}__:del`
], async function(e, data) {

  let key = format(data);
  if (key) {
    console.log('del user', key);
    await rsDestroy(key);
  }
});

// Format event
function format(data) {
  if (data[0] === 'message') {
    return data.reverse()[0]
  } else {
    setTimeout(() => console.log(chalk.magentaBright(`rsu-> ${data}`)), 300);
  }
}
