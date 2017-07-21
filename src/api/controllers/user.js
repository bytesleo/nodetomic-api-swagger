import {result, notFound, error} from 'express-easy-helper';
import User from '../models/user';


export function create(req, res) {

  return User.create(req.body)
    .then(api.ok(res, 201))
    .catch(api.error(res));

}

export function read(req, res) {

  return User.findById(req.swagger.params.id.value, {
      social: 0
    }).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));

}

export function update(req, res) {

  return User.findById(req.user._id).exec()
    .then(notFound(res))
    // .then(patch(req.body))
    .then(result(res))
    .catch(error(res))

}

export function me(req, res) {

  let user = req.user;
  delete user.key;
  return result(res, user);

}
