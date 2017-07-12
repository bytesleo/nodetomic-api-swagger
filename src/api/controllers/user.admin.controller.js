import User from '../models/user.model';
import {
  result,
  error,
  notFound,
  patch,
  remove,
}
from '../../lib/helper';

export function list(req, res) {

  return User.find({}, {
      password: 0
    }).exec()
    .then(result(res))
    .catch(error(res));

}

export function update(req, res) {

  return User.findById(req.swagger.params.id.value).exec()
    .then(notFound(res))
    .then(patch(req.body))
    .then(result(res))
    .then(error(res))

}

export function destroy(req, res) {

  return User.deleteOne({
      _id: req.swagger.params.id.value
    }).exe()
    .then(result(res))
    .then(error(res))

}
