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

  return User.findByIdAndUpdate(
      req.swagger.params.id.value, {
        $set: {
          username: req.body.username,
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          photo: req.body.photo,
          provider: req.body.provider,
          roles: req.body.roles,
          status: req.body.status,
        }
      }, {
        new: true
      }).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

export function destroy(req, res, next) {

  return User.deleteOne({
      _id: req.swagger.params.id.value
    })
    .then(notFound(res))
    .then(result(res))
    .then(error(res))

}
