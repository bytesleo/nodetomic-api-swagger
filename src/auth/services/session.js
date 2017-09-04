import { result, invalid, error } from 'express-easy-helper';
import { time } from 'role-calc';
import { r } from '../../lib/redis';
import config from '../../config';

// Initialize after login success
export async function initialize(err, user, res) {
  try {
    // Errors
    if (err)
      return invalid(res, { message: err });
    if (!user)
      return error(res, { message: 'Something went wrong, please try again.' });

    // Calculate ttl by user roles
    let roles = [];
    user.roles.forEach(role => config.roles.forEach(crole => role === crole.role ? roles.push(crole) : null));
    let _ttl = time(roles, 'max');

    // Create session in redis-jwt
    const token = await r.sign(user._id.toString(), { ttl: _ttl, request: res.req });

    // Save token in cookies
    res.cookie('token', JSON.stringify(token));

    // if local return token
    if (user.provider === 'local')
      return result(res, { token });

    // if Social redirect to..
    res.redirect('/token');

  } catch (err) {
    return error(res, { message: err });
  }
}