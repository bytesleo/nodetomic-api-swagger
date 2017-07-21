import {result, notFound, error} from 'express-easy-helper';
import Hello from '../models/hello';

export function list(req, res) {

  return Hello.find().exec()
    .then(result(res))
    .catch(error(res));
}

export function read(req, res) {

  return Hello.findById(req.swagger.params.id.value).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));

}

export function create(req, res) {

  return Hello.create(req.body)
    .then(result(res, 201))
    .catch(error(res));

}

export function update(req, res) {

  return Hello.findByIdAndUpdate(
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

export function destroy(req, res) {

  return Hello.deleteOne({
      _id: req.swagger.params.id.value
    }).exec()
    .then(result(res))
    .catch(error(res));

}
