import fs from "fs";
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import config from '../config';

export default (app) => {

  // Paths 404 from url
  app.get(config.path.disabled, (req, res) => {
    res.status(404).sendFile(`${config.base}/views/404.html`);
  });

  // Point static path to client
  if (fs.existsSync(config.client)) {
    app.use(express.static(config.client));
    app.use(favicon(path.join(config.client, 'favicon.ico')));
  }

  // Paths specials from client
  // app.use('/bower_components', express.static(`${config.root}/bower_components`));

  // Folder client
  app.get('/*', (req, res) => {
    res.sendFile(`${config.client}/index.html`);
  });

  // Other folder client
  // app.get('/:url(admin)/*', (req, res) => {
  //     res.sendFile(`${config.client2}/index.html`);
  // });

}
