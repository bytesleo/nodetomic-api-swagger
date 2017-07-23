import {verifyToken} from '../../auth/services/middleware';
import config from '../../config';

export default (app, swaggerConfig, middleware) => {
  // Init Middleware
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerSecurity({Bearer: verifyToken}));

  // Init Routers Swagger
  let routerConfig = {
    controllers: [
      `${config.base}/api/controllers`,
      `${config.base}/auth/controllers`
    ],
    useStubs: false //if you want use examples!
  };
  app.use(middleware.swaggerRouter(routerConfig));
  // app.use(middleware.swaggerUi()); (old version) -> /docs

  // Init docs /api-docs
  require('./path').default(app, swaggerConfig);

};
