import {result, notFound, error} from 'express-easy-helper';
import User from '../models/user';

// List of user's
export function list(req, res) {

  return User.find({})
    .select('-social')
    .exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));

}

// Update a user
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

// Destroy a user
export function destroy(req, res, next) {

  return User.findByIdAndRemove(
    req.swagger.params.id.value
    ).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}
