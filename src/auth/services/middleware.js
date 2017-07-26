import {unauthorized, forbidden} from 'express-easy-helper';
import {exits as rExits, ttl as rTtl} from '../../lib/redis';
import {hasRole} from '../../lib/utility/role';
import {verify} from '../../lib/token';
import User from '../../api/models/user';

// VerifyToken
export async function verifyToken(req, authOrSecDef, token, cb) {

  // these are the scopes/roles defined for the current endpoint
  let currentScopes = req.swagger.operation["x-security-scopes"];

  if (token) {
    // Bearer
    req.headers.authorization = `Bearer ${token}`;

    // Verify Token
    let decode = await verify(token);
    if (!decode)
      return cb(forbidden(req.res));

    // Key session in redis
    let key = `${decode._id}:${decode._verify}`;

    // Verify if exits token in redis
    if (!await rExits(key))
      return cb(unauthorized(req.res));

    // Extract info user from MongoDB
    let _user = await User.findById(decode._id).select('-social').exec();
    if (!_user)
      return cb(unauthorized(req.res));

    // If id's not equals
    if (_user._id.toString() !== decode._id.toString())
      return cb(forbidden(req.res));

    // User is enabled?
    if (!_user.status)
      return cb(unauthorized(req.res));

    // Verify Roles
    if (currentScopes)
      if (!hasRole(currentScopes, _user.roles))
        return cb(forbidden(req.res));

    // get current TTL
    let ttl = await rTtl(key);

    // Success
    req.user = Object.assign({
      key,
      ttl
    }, _user._doc);

    return cb(null);
  } else {
    return cb(forbidden(req.res));
  }
}
