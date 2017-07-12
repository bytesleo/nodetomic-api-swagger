import passport from 'passport';
import {initialize} from '../service';

export function index(req, res, next) {

  passport.authenticate('local', (err, user) => {

    initialize(err, user, res);
  
  })(req, res, next);

}
