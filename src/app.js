import express from 'express';
import http from 'http';
import swaggerTools from 'swagger-tools';
import chalk from 'chalk';
import config from './config';
const app = express();
// Swagger
let swaggerConfig = require('./core/swagger/config').default(app);
// Init
swaggerTools.initializeMiddleware(swaggerConfig, (middleware) => {
  // Core
  require('./core/engine').default(app);
  // Routers Express
  require('./core/router').default(app);
  // Mongo
  require('./core/mongoose');
  // Swagger
  require('./core/swagger').default(app, swaggerConfig, middleware);
  // Paths
  require('./core/path').default(app);
  // Create HTTP server.
  const server = http.createServer(app);
  // Listen Server
  server.listen(config.server.port, config.server.ip, () => {
    process.env.NODE_ENV = config.mode;
    console.log(chalk.greenBright(`\n\n-------\nServer-> listening on http://${config.server.ip}:${config.server.port} in mode [${config.mode}]\n-------`));
  });
});
