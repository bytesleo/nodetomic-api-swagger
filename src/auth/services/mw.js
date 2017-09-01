import { unauthorized, forbidden } from 'express-easy-helper';
import { r } from '../../lib/redis-jwt';
import { hasRole } from '../../lib/util/role';
import User from '../../api/models/user';

// VerifyToken
export async function mw(req, authOrSecDef, token, cb) {

  // these are the scopes/roles defined for the current endpoint
  let requiredRoles = req.swagger.operation["x-security-scopes"];

  if (token) {
    // Bearer
    req.headers.authorization = `Bearer ${token}`;

    // Verify Token with redis-jwt
    let rjwt = await r.verify(token);
    if (!rjwt)
      return cb(forbidden(req.res));

    // Extract info user from MongoDB
    let _user = await User.findById(rjwt._id).select('-social').exec();
    if (!_user)
      return cb(unauthorized(req.res));

    // If id's not equals
    if (_user._id.toString() !== rjwt._id.toString())
      return cb(forbidden(req.res));

    // User is enabled?
    if (!_user.status)
      return cb(unauthorized(req.res));

    // Verify Roles
    if (requiredRoles)
      if (!hasRole(requiredRoles, _user.roles))
        return cb(forbidden(req.res));

    // Success
    req.user = Object.assign({ rjwt }, _user._doc);

    return cb(null);
  } else {
    return cb(forbidden(req.res));
  }
}