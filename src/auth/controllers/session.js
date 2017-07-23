import {result, notFound, error} from 'express-easy-helper';
import {getValuesByPattern as rsGetAll,destroy as rsDestroy} from '../../lib/redis/rs';

// List of sessions by user
export function list(req, res) {

  return rsGetAll(req.user._id)
  .then(result(res))
  .catch(error(res))

}

// Destroy a session
export function destroy(req, res) {

  return rsDestroy(`${req.user._id}:${req.swagger.params.verify.value}`)
  .then(notFound(res))
  .then(result(res))
  .catch(error(res))

}

// Destroy a current session
export async function logout(req, res) {

  return rsDestroy(req.user.key)
  .then(notFound(res))
  .then(result(res))
  .catch(error(res))

}
