import passport from 'passport';
import {initialize} from '../services/session';

export function index(req, res, next) {

  passport.authenticate('bitbucket')(req, res, next);

}

export function callback(req, res, next) {

  passport.authenticate('bitbucket', (err, user) => initialize(err, user, res))(req, res, next);

}
