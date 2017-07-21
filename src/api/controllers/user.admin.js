import {result, notFound, error} from 'express-easy-helper';
import User from '../models/user';

export function list(req, res) {

  return User.find({}, {
      social: 0
    }).exec()
    .then(result(res))
    .catch(error(res));

}

export function update(req, res) {

  return User.findById(req.swagger.params.id.value).exec()
    .then(notFound(res))
    // .then(patch(req.body))
    .then(result(res))
    .then(error(res))

}

export function destroy(req, res, next) {

  return User.deleteOne({
      _id: req.swagger.params.id.value
    })
    .then(notFound(res))
    .then(result(res))
    .then(error(res))

}
