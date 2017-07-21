import {result, invalid, error} from 'express-easy-helper';
import {create as jwt} from '../../lib/token';
import {create as redis} from '../../lib/redis';
import {makeid, calculateTTL, encrypt, decrypt} from '../../lib/utility';

export function initialize(err, user, res) {

  // Errors
  if (err)
    return invalid(res, {message: err});
  if (!user)
    return error(res, {message: 'Something went wrong, please try again.'});

  // values to save
  let _user = {
    _id: user._id,
    username: user.username,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    photo: user.photo,
    provider: user.provider,
    roles: user.roles,
    status: user.status,
    date: user.date,
    lastLogin: user.lastLogin
  }

  // Create
  return create(_user).then(token => {
    switch (_user.provider) {
      case 'local':
        result(res, {token});
        break;
      default:
        res.cookie('token', JSON.stringify(token));
        res.redirect('/');
    }
  }).catch(error(res));

}

async function create(user) {
  // verify
  let verify = await makeid(11);
  // Jwt
  let token = await jwt(user, verify);
  // Redis
  let key = `${user._id.toString()}:${verify}`;
  let data = encrypt(JSON.stringify(user));
  let ttl = calculateTTL(user.roles);
  await redis(key, data, ttl);
  return token;
}
