import { result, notFound, error } from 'express-easy-helper';
import { getValuesByPattern as reGetAll, destroy as reDestroy, destroyMultiple as reDestroyM } from '../../lib/redis';

// List of sessions by id
export function list(req, res) {

  return reGetAll(req.swagger.params.id.value)
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

  return reDestroy(`${req.swagger.params.id.value}:${req.swagger.params.verify.value}`)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}


// Logout a user by id
export function logout(req, res) {

  return reDestroyM(req.swagger.params.id.value)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}
