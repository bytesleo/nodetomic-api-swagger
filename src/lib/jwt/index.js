// Sign with default (HMAC SHA256)
import jwt from 'jsonwebtoken';
import config from '../../config';

// Create Token
export async function create(_id, _verify) {

  try {
    return await jwt.sign({
      _id,
      _verify
    }, config.secret);
  } catch (err) {
    return false;
  }

}

// Verify Token
export async function verify(token) {

  try {
    return jwt.verify(token, config.secret);
  } catch (err) {
    return false;
  }

}
