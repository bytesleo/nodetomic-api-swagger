import express from 'express';
import config from '../../config';

export default (app, swaggerConfig) => {

  // Delete Paths from /api-docs
  if (config.oAuth) {
    Object.keys(config.oAuth).forEach(elem => {
      if (elem !== 'local') {
        delete swaggerConfig.paths[`/auth/${elem}`]
        delete swaggerConfig.paths[`/auth/${elem}/callback*`]
      }
    });
  }
  // Example
  // delete swaggerConfig.paths['/auth/github'];

  // If Swagger is enabled then the router is enabled!
  if (config.swagger.enabled) {
    app.get(`/swagger.json`, (req, res) => res.json(swaggerConfig));
    app.use('/docs', express.static(`${config.base}/lib/swagger/api-docs`));
  }
};
