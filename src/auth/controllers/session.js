import { result, notFound, error } from 'express-easy-helper';
import { call } from '../../lib/redis-jwt';

// List of sessions by user
export function list(req, res) {

  return call.getValuesByPattern(req.user._id)
    .then(notFound(res))
    .then(all => {
      for (let prop in all)
        all[prop] = JSON.parse(all[prop]);
      return result(res, all);
    })
    .catch(error(res))

}

// Destroy a session
export function destroy(req, res) {

  return call.destroy(`${req.user._id}:${req.swagger.params.verify.value}`)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

// Destroy a current session
export function logout(req, res) {

  return call.destroy(req.user.key)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}
