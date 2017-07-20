import passport from 'passport';
import {initialize} from '../services/session';

export function index(req, res, next) {

  passport.authenticate('github')(req, res, next);

}

export function callback(req, res, next) {

  passport.authenticate('github', (err, user) => initialize(err, user, res))(req, res, next);

}
