import { result, notFound, error } from 'express-easy-helper';
import { getSize as reGetSize, getInfo as reGetInfo } from '../../lib/redis';

// Get Size
export function size(req, res) {

  return reGetSize()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))
}

// Get info
export function info(req, res) {

  return reGetInfo(req.user.key).then(r => {
    res.send(r);
  }).catch(error(res))

}
