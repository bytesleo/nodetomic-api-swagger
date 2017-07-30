import { result, notFound, error } from 'express-easy-helper';
import { emit as socketEmit } from '../sockets/animation';

// Emit Socket!
export function emit(req, res) {

  socketEmit(req.swagger.params.action.value);
  return result(res, 'cool!');

}
