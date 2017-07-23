// Sign with default (HMAC SHA256)
import jwt from 'jsonwebtoken';
import config from '../../config';

// Create Token
export async function create(user, verify) {

  let token = null;
  try {
    token = jwt.sign({
      _id: user._id,
      _verify: verify
    }, config.secret);
  } catch (err) {
    throw 'Error creating token';
  }
  return token;

}

// Verify Token
export async function verify(token) {

  let isMatch = null;
  try {
    isMatch = jwt.verify(token, config.secret);
  } catch (err) {
    isMatch = false;
  }
  return isMatch;

}
