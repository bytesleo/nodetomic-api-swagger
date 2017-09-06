import { result, notFound, error } from 'express-easy-helper';
import { call } from '../../lib/redis-jwt';

// List of sessions by id
export function list(req, res) {

  return call.getValuesByPattern(req.swagger.params.id.value)
    .then(notFound(res))
    .then(all => {
      for (let prop in all)
        all[prop] = JSON.parse(all[prop]);
      return result(res, all);
    })
    .catch(error(res))

}

// Destroy a session by id
export function destroy(req, res) {

  return call.destroy(`${req.swagger.params.id.value}:${req.swagger.params.verify.value}`)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}


// Logout a user by id
export function logout(req, res) {

  return call.destroyMultiple(req.swagger.params.id.value)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}