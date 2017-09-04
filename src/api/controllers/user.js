import { result, notFound, error } from 'express-easy-helper';
import User from '../models/user';

// Create a user
export function create(req, res) {

  return User.create({
    username: req.body.username,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  })
    .then(result(res, 201))
    .catch(error(res));

}

// Read a user
export function read(req, res) {

  return User.findById(req.swagger.params.id.value, {
    social: 0
  }).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));

}

// Update user
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

// Get current user
export function me(req, res) {

  let user = req.user;
  delete user.rjwt.rjwt;
  delete user.rjwt.id;
  return result(res, user);

}
