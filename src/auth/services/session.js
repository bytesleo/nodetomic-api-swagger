import { result, invalid, error } from 'express-easy-helper';
import { r } from '../../lib/redis-jwt';
import { ttlRole } from '../../lib/util/role';

// Initialize after login success
export async function initialize(err, user, res) {
  try {
    // Errors
    if (err)
      return invalid(res, { message: err });
    if (!user)
      return error(res, { message: 'Something went wrong, please try again.' });

    // Calculate ttl by user role
    let _ttl = ttlRole(user.roles);

    // Create session in redis-jwt
    const token = await r.create(res.req, user._id.toString(), _ttl);

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