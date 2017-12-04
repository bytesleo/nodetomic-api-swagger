import { unauthorized, forbidden } from 'express-easy-helper';
import { has } from 'role-calc';
import { r } from '../../lib/redis-jwt';
import User from '../../api/models/user.model';

// VerifyToken
export async function mw(req, authOrSecDef, token, cb) {

  // these are the scopes/roles defined for the current endpoint
  let requiredRoles = req.swagger.operation["x-security-scopes"];

  if (token) {
    // Bearer
    req.headers.authorization = `Bearer ${token}`;

    // Verify Token with redis-jwt -> if you want to extract the data you should add true: r.verify(token, true);
    let session = await r.verify(token, true);
    if (!session)
      return cb(forbidden(req.res));

    // Extract info user from MongoDB
    let _user = await User.findById(session.id).select('-social').exec();
    if (!_user)
      return cb(unauthorized(req.res));

    // If id's not equals
    if (_user._id.toString() !== session.id.toString())
      return cb(forbidden(req.res));

    // User is enabled?
    if (!_user.status)
      return cb(unauthorized(req.res));

    // Verify Roles
    if (requiredRoles)
      if (!has(requiredRoles, _user.roles))
        return cb(forbidden(req.res));

    // Success
    req.user = Object.assign({ session }, _user._doc);

    return cb(null);
  } else {
    return cb(forbidden(req.res));
  }
}