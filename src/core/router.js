import fs from "fs";
import config from '../config';

import passport from 'passport';

export default(app) => {
  //-> api/version/example: push in noLoad 'example' or renamed api/version/_example

  // fs.readdirSync(`${config.base}/api/`).forEach(route => {
  //   if (config.router.ignore.indexOf(route) < 0)
  //     if (route.charAt(0) !== '_')
  //       app.use(`/api/${route}`, require(`../api/${route}`).default);
  // });

  // Routers Manual
  // app.use('/api/auth', require('../lib/auth').default);
  // app.use('/auth', require('../auth').default);

  require('../auth/index');

  // app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
  //   console.log('->', req.user)
  //   // res.redirect('/');
  //   res.status(200).send('ok');
  // });

};
