import { result, notFound, error } from 'express-easy-helper';
import { getValuesByPattern as reGetAll, destroy as reDestroy } from '../../lib/redis';

// List of sessions by user
export function list(req, res) {

  return reGetAll(req.user._id)
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

  return reDestroy(`${req.user._id}:${req.swagger.params.verify.value}`)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

// Destroy a current session
export function logout(req, res) {

  return reDestroy(req.user.key)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}
