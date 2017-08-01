import { result, error } from 'express-easy-helper';
import { getInfo as reGetInfo } from '../../lib/redis';

// Get section
export function section(req, res) {

  return reGetInfo(req.swagger.params.section.value).then(info => {
    res.send(info.toString());
  }).catch(error(res))

}
