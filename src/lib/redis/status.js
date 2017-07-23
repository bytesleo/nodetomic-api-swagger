import chalk from 'chalk';

export default(r, conn, name) => {

  const uri = `${conn.host}:${conn.port}/${conn.db}`;

  //happen only once
  r.on('ready', () => {
    console.log(chalk.greenBright(`-------\nRedis[${name}]-> connected on ${uri}\n-------`));
  });

  //happen each time when reconnected
  r.on('connected', () => {
    //console.log('redis connected');
  });

  r.on('disconnected', () => {
    console.log(chalk.redBright(`Redis[${name}]-> disconnected: ${uri}`));
  });

  r.on('error', (err) => {
    console.log(chalk.redBright(`Redis[${name}]-> error: ${uri} - detail: ${err}`));
  });

  setTimeout(async() => {
    if (!await r.rawCall(['ping'])) {
      console.log(chalk.redBright(`Redis[${name}]-> Could not establish a connection: ${uri}`));
      process.exit(-1);
    }
  }, 2000);

};
