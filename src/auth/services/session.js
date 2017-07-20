import api from 'express-easy-helper';
import {create as jwt} from '../../lib/token';
import {create as redis} from '../../lib/redis';
import {makeid, calculateTTL, encrypt, decrypt} from '../../lib/utility';

export function initialize(err, user, res) {

  // Errors
  if (err)
    return api.invalid(res, {message: err});
  if (!user)
    return api.error(res, {message: 'Something went wrong, please try again.'});

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
        api.ok(res, {token});
        break;
      default:
        res.cookie('token', JSON.stringify(token));
        res.redirect('/');
    }
  }).catch(api.error(res));

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
