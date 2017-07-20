import fs from "fs";
import config from '../config';

export default (app) => {

  // Example Manual
  // app.use('/path', require('../path').default);

  require('../auth/services');

};
