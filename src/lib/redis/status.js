import chalk from 'chalk';

export default(r, uri) => {

  //happen only once
  r.on('ready', () => {
    console.log(chalk.greenBright(`----------\nRedis-> connected on ${uri}\n----------`));
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
