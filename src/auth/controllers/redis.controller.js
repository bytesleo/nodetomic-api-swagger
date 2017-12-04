import { result, error } from 'express-easy-helper';
import { call } from '../../lib/redis-jwt';

/* Administrator */

// Get section
export function section(req, res) {

  return call.getInfo(req.swagger.params.section.value).then(info => {
    res.send(info.toString());
  }).catch(error(res))

}