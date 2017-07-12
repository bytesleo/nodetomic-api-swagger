import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../../api/models/user.model';

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  //passReqToCallback: true
}, function(username, password, done) {

  User.findOne({
    username: username,
    provider: 'local'
  }).exec().then(user => {

    if (!user)
      return done(`${username}' is not registered.`); // You can register user here

    user.authenticate(password).then((isMatch) => { //validate password
      if (!isMatch)
        return done('This password is not correct.');
      user.last_login = Date.now(); //save log last_login
      user.save().then(done(null, user)).catch(err => done(err));
    });

  }).catch(err => done(err));

}));
