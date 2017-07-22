import chalk from 'chalk';

export default(r, conn) => {

  //happen only once
  r.on('ready', () => {
    console.log(chalk.greenBright(`----------\nRedis-> connected on ${conn.host}:${conn.port}/${conn.db}\n----------`));
  });

  //happen each time when reconnected
  r.on('connected', () => {
    //console.log('redis connected');
  });

  r.on('disconnected', () => {
    console.log('redis disconnected');
  });

  r.on('error', (e) => {
    console.log('redis error', e);
  });

};
