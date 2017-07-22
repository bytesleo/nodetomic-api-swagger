import {result, notFound, error} from 'express-easy-helper';
import {getValuesByPattern as rsGetAll, destroy as rsDestroy } from '../../lib/redis/rs';

export function list(req, res) {

  return rsGetAll(req.user._id)
  .then(result(res))
  .catch(error(res))

}

export function destroy(req, res) {

  return rsDestroy(`${req.user._id}:${req.swagger.params.verify.value}`)
  .then(notFound(res))
  .then(result(res))
  .catch(error(res))

}
