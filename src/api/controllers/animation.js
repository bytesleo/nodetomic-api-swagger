import { result, error } from 'express-easy-helper';
import { emit } from '../sockets/animation';

// Emit animation with socket!
export function animation(req, res) {
  try {
    emit('animation', req.swagger.params.action.value);
    return result(res, 'Socket emitted!');
  } catch (err) {
    return error(res, 'No client with event...');
  }
}
