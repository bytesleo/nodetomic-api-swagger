import { result, invalid, error } from 'express-easy-helper';
import { create as jwtCreate } from '../../lib/jwt';
import { create as reCreate } from '../../lib/redis';
import { makeid } from '../../lib/util/makeid';
import { ttlRole } from '../../lib/util/role';

// Initialize after login success
export async function initialize(err, user, res) {
  // Errors
  if (err)
    return invalid(res, { message: err });
  if (!user)
    return error(res, { message: 'Something went wrong, please try again.' });

  // Values to save in redis session
  let session = {
    verify: makeid(11),
    agent: res.req.headers['user-agent'],
    ip: res.req.headers['x-forwarded-for'] || res.req.connection.remoteAddress
  }

  try {
    // Create Token and save in Redis
    let token = await create(user, session);
    // Save token in cookies
    res.cookie('token', JSON.stringify(token));
    // if local return token
    if (user.provider === 'local')
      return result(res, { token });

    // if Social redirect to..
    res.redirect('/token');
  } catch (err) {
    return error(res, { message: `Error creating keys in redis ${err}` });
  }

}

// Create keysand value in redis
async function create(user, session) {
  // Id user
  let _id = user._id.toString();
  // Init Jwt
  let token = await jwtCreate(_id, session.verify);
  // Create key in redis for session
  let _key = `${_id}:${session.verify}`;
  // Stringify info session
  let _session = JSON.stringify(session);
  // Calculate ttl by user role
  let _ttl = ttlRole(user.roles);
  // Create Session in redis
  await reCreate(_key, _session, _ttl);
  // Return token
  return token;
}
