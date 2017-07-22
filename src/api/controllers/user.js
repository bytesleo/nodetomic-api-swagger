import {result, notFound, error} from 'express-easy-helper';
import User from '../models/user';
import {getValuesByPattern as rsGetAll, destroy as rsDestroy } from '../../lib/redis/rs';

export function create(req, res) {

  return User.create(req.body)
    .then(result(res, 201))
    .catch(error(res));

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

  return User.findByIdAndUpdate(
      req.user._id, {
        $set: {
          username: req.body.username,
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          photo: req.body.photo
        }
      }, {
        new: true,
        // req:req
      }).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

export function me(req, res) {

  let user = req.user;
  delete user.key; //session key
  return result(res, user);

}
