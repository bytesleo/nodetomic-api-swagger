import config from '../../config';

export default (app, swaggerConfig) => {

  if (config.oAuth) {
    Object.keys(config.oAuth).forEach(elem => {
      if (elem !== 'local') {
        delete swaggerConfig.paths[`/auth/${elem}`]
        delete swaggerConfig.paths[`/auth/${elem}/callback*`]
      }
    });
  }

  if (config.swagger.enabled)
    app.get(`/swagger.json`, (req, res) => res.json(swaggerConfig));
};

// delete swaggerConfig.paths['/auth/github'];
