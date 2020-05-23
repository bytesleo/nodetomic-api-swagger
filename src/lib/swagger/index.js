import swaggerTools from "swagger-tools";
import express from "express";
import { error } from "express-easy-helper";
import YAML from "yamljs";
import { mw } from "../../auth/services/mw.service";
import config from "../../config";

export async function index(app) {
  let swaggerConfig = await require("./config").default(app);

  let routerConfig = {
    controllers: [
      `${config.base}/api/controllers`,
      `${config.base}/auth/controllers`,
    ],
    useStubs: false, // If you want use examples.
  };

  return new Promise((resolve, reject) => {
    swaggerTools.initializeMiddleware(swaggerConfig, (middleware) => {
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      app.use(middleware.swaggerMetadata());

      // Provide the security handlers
      app.use(middleware.swaggerSecurity({ Bearer: mw }));

      // Validate Swagger requests
      app.use(middleware.swaggerValidator({ validateResponse: false }));

      // Route validated requests to appropriate controller
      app.use(middleware.swaggerRouter(routerConfig));

      // Serve the Swagger documents and Swagger UI
      //   http://localhost:8000/docs => Swagger UI
      //   http://localhost:8000/api-docs => Swagger document
      // app.use(middleware.swaggerUi());

      app.use(errorHandler);

      router(app, swaggerConfig);

      resolve();
    });
  });
}

function router(app, swaggerConfig) {
  // Remove Routers from /docs with property x-hide: true
  Object.keys(swaggerConfig.paths).forEach((keyParent, i) => {
    let parent = swaggerConfig.paths[keyParent];
    Object.keys(parent).forEach((keyChild, j) => {
      let child = swaggerConfig.paths[keyParent][keyChild];
      if (
        typeof child === "object" &&
        "x-hide" in child &&
        child["x-hide"] === true
      ) {
        delete swaggerConfig.paths[keyParent][keyChild];
      }
    });
  });

  // or remove manual, exmaple:
  // delete swaggerConfig.paths['/auth/github'];

  // If Swagger is enabled then the router is enabled!
  if (config.swagger.enabled) {
    app.get(`/swagger.json`, (req, res) => res.json(swaggerConfig));
    app.use("/docs", express.static(`${config.base}/lib/swagger/ui`));
  }
}

// disable debug [object][object]
function errorHandler(err, req, res, next) {
  if (!res.headersSent) {
    return error(res, err.message);
  }
}
