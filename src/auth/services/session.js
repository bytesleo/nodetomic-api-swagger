import {result, invalid, error} from 'express-easy-helper';
import {create as jwtCreate} from '../../lib/token';
import {create as rsCreate} from '../../lib/redis/sessions';
import {create as ruCreate, get as ruGet, update as ruSet, destroy as ruDestroy} from '../../lib/redis/users';
import {makeid} from '../../lib/utility/makeid';
import {ttl} from '../../lib/utility/ttl';
import {encrypt, decrypt} from '../../lib/utility/crypto';

// Initialize after login success
export async function initialize(err, user, res) {
  // Errors
  if (err)
    return invalid(res, {message: err});
  if (!user)
    return error(res, {message: 'Something went wrong, please try again.'});

  // Values to save in redis user (ru)
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

  // Values to save in redis session (rs)
  let _session = {
    verify: makeid(11),
    agent: res.req.headers['user-agent'],
    ip: res.req.headers['x-forwarded-for'] || res.req.connection.remoteAddress
  }

  let token = null;
  try {
    // Create Token and save in Redis
    token = await create(_user, _session);
    // Local
    if (_user.provider === 'local')
      return result(res, {token});
    // Social
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
  } catch (err) {
    return error(res, {message: `Error creating keys in redis ${err}`});
  }

}

// Create keysand value in redis
async function create(user, session) {
  // Init Jwt
  let token = await jwtCreate(user, session.verify);
  // Create key in redis for session
  let _key = `${user._id.toString()}:${session.verify}`;
  // Encrypt info user
  let _user = encrypt(JSON.stringify(user));
  // Stringify info session
  let _session = JSON.stringify(session);
  // Calculate ttl by user rol
  let _ttl = ttl(user.roles);
  // Create Session in redis
  await rsCreate(_key, _session, _ttl);
  // Create User in redis
  await ruCreate(_key, _user);
  // Return token
  return token;
}

// If the user model is updated it is synchronized with redis
export async function update(id, userUpdated) {
  // Get info user from redis
  let userOld = await ruGet(id);
  // Parse info to JSON
  userOld = await JSON.parse(decrypt(userOld));
  // Merge info old and new info
  let merge = Object.assign(userOld, userUpdated);
  // Encrypt merge info
  let user = encrypt(JSON.stringify(merge));
  // Set info in redis
  return await ruSet(id, user);
}

// If the user model is destroyed clean with redis
export async function destroy(id) {
  // Destroy user from redis
  return await ruDestroy(id);
}
