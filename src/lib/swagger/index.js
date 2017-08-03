import { error } from 'express-easy-helper';
import { verifyToken } from '../../auth/services/middleware';
import config from '../../config';

export default (app, swaggerConfig, middleware) => {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());
  // Provide the security handlers
  app.use(middleware.swaggerSecurity({ Bearer: verifyToken }));
  // Validate Swagger requests
  app.use(middleware.swaggerValidator({ validateResponse: false }));

  // Route validated requests to appropriate controller
  let routerConfig = {
    controllers: [
      `${config.base}/api/controllers`, `${config.base}/auth/controllers`
    ],
    useStubs: false //if you want use examples!
  };
  app.use(middleware.swaggerRouter(routerConfig));

  // Serve the Swagger documents and Swagger UI
  //   http://localhost:8000/docs => Swagger UI
  //   http://localhost:8000/api-docs => Swagger document
  // app.use(middleware.swaggerUi());

  app.use(errorHandler);

  // Init docs /api-docs
  require('./router').default(app, swaggerConfig);
};

// disable debug [object][object]
function errorHandler(err, req, res, next) {
  if (!res.headersSent) {
    return error(res, err.message);
  }
}
