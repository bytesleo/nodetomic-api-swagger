import passport from 'passport';

// Call back login Social return info in req.user

require('./passport/local.passport');
require('./passport/github.passport');
//require('./passport/google.passport');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
