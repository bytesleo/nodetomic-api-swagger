import api from 'express-easy-helper';
import Hello from '../models/hello';


export function list(req, res) {

  return Hello.find().exec()
    .then(api.ok(res))
    .catch(api.error(res));
}

export function read(req, res) {

  return Hello.findById(req.swagger.params.id.value).exec()
    .then(api.notFound(res))
    .then(api.ok(res))
    .catch(api.error(res));

}

export function create(req, res) {

  return Hello.create(req.body)
    .then(api.ok(res, 201))
    .catch(api.error(res));

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
    .then(api.notFound(res))
    .then(api.ok(res))
    .catch(api.error(res))

}

export function destroy(req, res) {

  return Hello.deleteOne({
      _id: req.swagger.params.id.value
    }).exec()
    .then(api.ok(res))
    .catch(api.error(res));

}
