import Redis from 'redis-fast-driver';
import chalk from 'chalk';
import config from '../../../config';
import {getCountByPattern as rsCount} from '../rs';
import {destroy as ruDestroy} from '../ru';

const r = new Redis(config.redis.rs);
require('../status').default(r, config.redis.rs, 'rse');

// If deleted any key in RS
r.rawCall([
  'subscribe', `__keyevent@${config.redis.rs.db}__:del`
], async function(e, data) {

  let key = format(data);
  if (key) {
    console.log('del', key);
    await cleanRu(key);
  }

});

// If expired any key in RS
r.rawCall([
  'subscribe', `__keyevent@${config.redis.rs.db}__:expired`
], async function(e, data) {

  let key = format(data);
  if (key) {
    console.log('expired', key);
    await cleanRu(key);
  }
});

// If there is only one, it also destroys the user for free up space in redis
async function cleanRu(key) {
  let id = key.split(':')[0];
  if (await rsCount(id) === 0)
    await ruDestroy(id);
  return true;
}

// Format event
function format(data) {
  if (data[0] === 'message') {
    return data.reverse()[0]
  } else {
    setTimeout(() => console.log(chalk.magentaBright(`rse-> ${data}`)), 300);
  }
}
