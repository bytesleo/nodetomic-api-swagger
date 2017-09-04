import express from 'express';
import swaggerTools from 'swagger-tools';
import chalk from 'chalk';
import config from './config';
const app = express();

async function run() {
  // Express
  await require('./core/express').index(app);
  // Swagger Config
  let swaggerConfig = await require('./lib/swagger/config').default(app);
  // Swagger Middleware
  swaggerTools.initializeMiddleware(swaggerConfig, middleware => {
    // Swagger Init 
    require('./lib/swagger').default(app, swaggerConfig, middleware);
    // Paths
    require('./core/path').default(app);
    // Server
    app.listen(config.server.port, config.server.ip, () => {
      console.log(chalk.greenBright(`-------\nServer-> 
      mode: [${chalk.magentaBright(`${config.mode}`)}]
      url: ${chalk.blueBright(`http://${config.server.ip}:${config.server.port}`)}\n-------`));
      console.log(chalk.black.bgGreenBright(`>>nodetomic-api-swagger ready!<<`));
    });
  });
}

run();