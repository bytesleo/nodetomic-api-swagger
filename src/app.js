import express from 'express';
import swaggerTools from 'swagger-tools';
import chalk from 'chalk';
import config from './config';
const app = express();

async function run() {
  // Core
  await require('./core').index(app);
  // Swagger Config
  let swaggerConfig = await require('./lib/swagger/config').default(app);
  // Swagger Middleware
  await swaggerTools.initializeMiddleware(swaggerConfig, middleware => {
    // Swagger Init 
    require('./lib/swagger').default(app, swaggerConfig, middleware);
    // Paths
    require('./core/path').default(app);
    // Server
    app.listen(config.server.port, config.server.ip, () => {
      process.env.NODE_ENV = config.mode;
      console.log(chalk.greenBright(`-------\nServer-> listening on http://${config.server.ip}:${config.server.port} in mode [${config.mode}]\n-------`));
    });
  });
}

run();