import {result, invalid, error} from 'express-easy-helper';
import {create as jwtCreate} from '../../lib/token';
import {create as rsCreate} from '../../lib/redis/rs';
import {create as ruCreate, get as ruGet, update as ruSet} from '../../lib/redis/ru';
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

  let _session = {
    verify: makeid(11),
    agent: res.req.headers['user-agent'],
    ip: res.req.headers['x-forwarded-for'] || res.req.connection.remoteAddress
  }

  return create(_user, _session).then(token => {
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

// Create session and user
async function create(user, session) {
  // Jwt
  let token = await jwtCreate(user, session.verify);
  // Redis
  let _key = `${user._id.toString()}:${session.verify}`;
  let _user = encrypt(JSON.stringify(user));
  let _session = JSON.stringify(session);
  // calculate ttl
  let _ttl = calculateTTL(user.roles);
  // Create session
  await rsCreate(_key, _session, _ttl);
  // Create user
  await ruCreate(_key, _user);
  return token;
}

// If the user model is updated it is synchronized with redis
export async function update(id, userUpdated) {
  let userOld = await ruGet(id);
  userOld = await JSON.parse(decrypt(userOld));
  let merge = Object.assign(userOld, userUpdated);
  let user = encrypt(JSON.stringify(merge));
  await ruSet(id, user);
  return true;
}
