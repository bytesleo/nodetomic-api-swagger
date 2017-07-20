import {verifyToken} from '../../auth/services/middleware';
import config from '../../config';


export default (app, swaggerConfig, middleware) => {

  //middleware
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerSecurity({Bearer: verifyToken}));
  //Routers Swagger
  let routerConfig = {
    controllers: [
      `${config.base}/api/controllers`,
      `${config.base}/auth/controllers`
    ],
    useStubs: false //use examples!
  };
  app.use(middleware.swaggerRouter(routerConfig));
  // app.use(middleware.swaggerUi());  /docs
  // Ignore paths in Docs
  require('./docs').default(app, swaggerConfig);

};
