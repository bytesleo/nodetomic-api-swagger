import fs from "fs";
import config from '../config';

export default (app) => {

  //-> api/version/example: push in noLoad 'example' or renamed api/version/_example
  // fs.readdirSync(`${config.base}/api`).forEach(version => {
    // fs.readdirSync(`${config.base}/api/`).forEach(route => {
    //   if (config.router.ignore.indexOf(route) < 0)
    //     if (route.charAt(0) !== '_')
    //       app.use(`/api/${route}`, require(`../api/${route}`).default);
    // });
 // });

  // Routers Manual
  // app.use('/api/auth', require('../lib/auth').default);
  app.use('/auth', require('../auth').default);
  // app.use('/api/version/hello', require('../api/version/hello'));

};
