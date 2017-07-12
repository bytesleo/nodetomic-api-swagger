import User from '../models/user.model';
import {
  result,
  error,
  notFound,
  patch,
  remove,
}
from '../../lib/helper';

export function create(req, res) {

  return User.create(req.body)
    .then(result(res, 201))
    .catch(error(res));

}

export function read(req, res) {

  return User.findById(req.params.id, {
      password: 0,
      social: 0
    }).exec()
    .then(result(res))
    .catch(error(res));

}

export function update(req, res) {

  return Hello.findById(req.user._id).exec()
    .then(notFound(res))
    .then(patch(req.body))
    .then(result(res))
    .catch(error(res))

}

export function me(req, res) {

  let user = req.user;
  user.ttl.available = user.ttl.assigned - Math.floor(((new Date().getTime()) -
    user.ttl.created) / 1000); //time session
  res.json(user);
  // return result(user);
}
