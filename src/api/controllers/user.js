import api from 'express-easy-helper';
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
    .then(api.notFound(res))
    .then(api.ok(res))
    .catch(api.error(res));

}

export function update(req, res) {

  return User.findById(req.user._id).exec()
    .then(api.notFound(res))
    // .then(patch(req.body))
    .then(api.ok(res))
    .catch(api.error(res))

}

export function me(req, res) {

  let user = req.user;
  delete user.key;
  return api.ok(res, user);

}
