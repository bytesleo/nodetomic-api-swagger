import express from 'express';
import chalk from 'chalk';
import config from './config';
const app = express();

(async function run() {

  // Express
  await require('./lib/express').index(app);

  // Mongoo
  await require('./lib/mongo').connect();

  // Redis
  await require('./lib/redis').connect();

  // Socket
  await require('./lib/socket').connect();

  // Services
  await require('./auth/services');

  // Swagger
  await require('./lib/swagger').index(app);

  // Paths
  await require('./lib/express/path').default(app);

  // Server 
  app.listen(config.server.port, config.server.ip, () => {
    // Info
    console.log(chalk.greenBright(`-------\nServer-> 
          mode: [${chalk.magentaBright(`${config.mode}`)}]
          url: ${chalk.blueBright(`http://${config.server.ip}:${config.server.port}`)}\n-------`));

    // Ready!
    console.log(chalk.black.bgGreenBright(`>>nodetomic-api-swagger ready!<<`));
  });

})();

