import passport from 'passport';
import config from '../../config';

// Call back login Social return info in req.user

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
//
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

//Passport's

if (config.oAuth.local.enabled) require('../passports/local');

if (config.oAuth.github.enabled) require('../passports/github');

if (config.oAuth.twitter.enabled) require('../passports/twitter');

if (config.oAuth.facebook.enabled) require('../passports/facebook');

if (config.oAuth.google.enabled) require('../passports/google');

if (config.oAuth.bitbucket.enabled) require('../passports/bitbucket');
