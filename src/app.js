import express from 'express';
import http from 'http';
import swaggerTools from 'swagger-tools';
import chalk from 'chalk';
import config from './config';
const app = express();
import * as auth from './lib/auth/swaggerMiddleware';

// Swagger
let swaggerConfig = require('./core/swagger').default(app);
// console.log(swaggerConfig);
// var YAML = require("yamljs");
// let swaggerConfig = YAML.load(config.base + "/api/swagger/swagger.yaml");

swaggerTools.initializeMiddleware(swaggerConfig, (middleware) => {
  // Core
  require('./core/engine').default(app);
  // Routers
  require('./core/router').default(app);
  // MongoDB
  require('./core/mongoose');

  app.use(middleware.swaggerMetadata());

  app.use(middleware.swaggerSecurity({
    Bearer: auth.verifyToken
  }));

  let routerConfig = {
    controllers: [config.base + '/api/controllers'],
    // controllers: [config.base + '/api/controllers',config.base + '/lib/auth'],
    useStubs: false
  };

  app.use(middleware.swaggerRouter(routerConfig));
  // router.use(middleware.swaggerUi());

  // Paths
  require('./core/path').default(app);
  // // Create HTTP server.
  const server = http.createServer(app);
  // // Listen Server
  server.listen(config.server.port, config.server.ip, () => {
    process.env.NODE_ENV = config.mode;
    console.log(chalk.greenBright(
      `\n\n-------\nServer-> listening on http://${config.server.ip}:${config.server.port} in mode [${config.mode}]\n-------`
    ));
  });

});
