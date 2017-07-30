import { result, notFound, error } from 'express-easy-helper';
import { emit as socket } from '../sockets/animation';

// Emit by Socket!
export function emit(req, res) {

  socket(req.swagger.params.action.value);
  return result(res, 'cool!');

}
