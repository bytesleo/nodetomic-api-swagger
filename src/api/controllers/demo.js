import { result, notFound, error } from 'express-easy-helper';
import { emit } from '../sockets/demo';
import Demo from '../models/demo';

// List Demo's
export function list(req, res) {

  return Demo.find().exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));
}

// Create a Demo
export function create(req, res) {

  return Demo.create(req.body)
    .then(result(res, 201))
    .catch(error(res));

}

// read a Demo
export function read(req, res) {

  return Demo.findById(req.swagger.params.id.value).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));

}

// Update a Demo
export function update(req, res) {

  return Demo.findByIdAndUpdate(
    req.swagger.params.id.value, {
      $set: {
        greet: req.body.greet,
        language: req.body.language,
      }
    }, {
      new: true
    }).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

// Destroy a Demo
export function destroy(req, res) {

  return Demo.deleteOne({
    _id: req.swagger.params.id.value
  }).exec()
    .then(result(res))
    .catch(error(res));

}

// Emit animation with socket!
export function animation(req, res) {
  try {
    emit('animation', req.swagger.params.action.value);
    return result(res, 'Socket emitted!');
  } catch (err) {
    return error(res, 'No client with event...');
  }
}
