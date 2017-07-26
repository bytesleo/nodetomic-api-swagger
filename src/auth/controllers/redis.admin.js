import {result, notFound, error} from 'express-easy-helper';
import {getSize as rGetSize,getInfo as rGetInfo} from '../../lib/redis';

// Get Size
export function size(req, res) {

  return rGetSize()
  .then(notFound(res))
  .then(result(res))
  .catch(error(res))
}

// Get info
export function info(req, res) {

  return rGetInfo(req.user.key).then(r => {
    res.send(r);
  }).catch(error(res))

}
