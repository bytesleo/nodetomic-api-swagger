import morgan from 'morgan';
import config from './../config';

export default(app) => {

  // Liverload
  if (config.livereload.enabled)
    app.use(require('connect-livereload')({src: `http://${config.livereload.ip}:${config.livereload.port}/livereload.js`}));

  if (config.log)
    app.use(morgan('dev'));

};
