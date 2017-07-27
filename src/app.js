import swaggerTools from 'swagger-tools';
import express from 'express';
import chalk from 'chalk';
import config from './config';
const app = express();
// Swagger Config
let swaggerConfig = require('./core/swagger/config').default(app);
// Swagger Init
swaggerTools.initializeMiddleware(swaggerConfig, (middleware) => {
  // Core
  require('./core/engine').default(app);
  // Routers Express
  require('./core/router').default(app);
  // Mongo
  require('./core/mongoose');
  // Redis
  require('./lib/redis');
  // Swagger
  require('./core/swagger').default(app, swaggerConfig, middleware);
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
