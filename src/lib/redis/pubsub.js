import Redis from 'redis-fast-driver';
import chalk from 'chalk';
import config from '../../config';

const r = new Redis(config.redis.sessions.conn);
require('./status').default(r, config.redis.sessions.conn, 'pubsub');

// Get CLuster or simple Process
const node = parseInt(process.env.NODE_APP_INSTANCE) || 0;

/*-----------
* Basic Exmaple Pubsub
*/

// Listener all nodes
r.rawCall([
  'subscribe', `news`
], async function (e, data) {
  console.log(chalk.blueBright(`${data} - node = ${node}`));
});

// Send publish from node 0
if (node === 0) {
  const r2 = new Redis(config.redis.sessions.conn);
  setTimeout(function (){
    r2.rawCall(['PUBLISH', 'news', 'hello world!']);
  }, 3000);
}
/*-----------*/


// Thread event manager (Expired, del)
if (config.redis.sessions.pubsub.events) {
  if (node === 0) {
    r.rawCall([
      'subscribe', `__keyevent@${config.redis.sessions.conn.db}__:del`, `__keyevent@${config.redis.sessions.conn.db}__:expired`
    ], async function (e, data) {

      let obj = get(data);
      let msg = '';
      if (obj) {
        switch (obj.event) {
          case 'expired':
            msg = `expired ${obj.key}`;
            break;
          case 'del':
            msg = `del ${obj.key}`;
            break;
          default:
            break;
        }
      } else {
        msg = data;
      }
      if (config.log)
        console.log(chalk.blueBright(`${msg} - node = ${node}`));
    });
  }
}

// Format event
function get(data) {
  if (data[0] === 'message') {
    let event = data[1].split(`__keyevent@${config.redis.sessions.conn.db}__:`)[1];
    let key = data.reverse()[0];
    return { event, key };
  } else {
    return null;
  }
}
