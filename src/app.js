import express from 'express';
import swaggerTools from 'swagger-tools';
import chalk from 'chalk';
import config from './config';
const app = express();

// Swagger Config
let swaggerConfig = require('./lib/swagger/config').default(app);
// Swagger middleware init
swaggerTools.initializeMiddleware(swaggerConfig, middleware => {
  // Core
  require('./core').default(app);
  // Swagger
  require('./lib/swagger').default(app, swaggerConfig, middleware);
  // Paths
  require('./core/path').default(app);
  // Server
  app.listen(config.server.port, config.server.ip, () => {
    process.env.NODE_ENV = config.mode;
    console.log(chalk.greenBright(
      `\n-------\nServer-> listening on http://${config.server.ip}:${config.server.port} in mode [${config.mode}]\n-------`
    ));
  });
});