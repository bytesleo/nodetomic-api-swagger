import api from 'express-easy-helper';
import User from '../models/user';

export function list(req, res) {

  return User.find({}, {
      social: 0
    }).exec()
    .then(api.ok(res))
    .catch(api.error(res));

}

export function update(req, res) {

  return User.findById(req.swagger.params.id.value).exec()
    .then(api.notFound(res))
    // .then(patch(req.body))
    .then(api.ok(res))
    .then(api.error(res))

}

export function destroy(req, res, next) {

  return User.deleteOne({
      _id: req.swagger.params.id.value
    })
    .then(api.notFound(res))
    .then(api.ok(res))
    .then(api.error(res))

}
