import {unauthorized, forbidden} from 'express-easy-helper';
import {verify} from '../../lib/token';
import {get as redis, ttl} from '../../lib/redis';
import {decrypt, hasRole} from '../../lib/utility';

// verifyToken
export async function verifyToken(req, authOrSecDef, token, cb) {

  //these are the scopes/roles defined for the current endpoint
  let currentScopes = req.swagger.operation["x-security-scopes"];
  // console.log('Require:', currentScopes);
  if (token) {
    // Bearer
    req.headers.authorization = `Bearer ${token}`;
    //Verify Token
    let decode = await verify(token);
    if (!decode)
      return cb(forbidden(req.res));
    let key = `${decode._id}:${decode._verify}`;
    //Extract info from redis
    let _user = await redis(key);
    if (!_user)
      return cb(unauthorized(req.res));

    //decrypt redis
    _user = await JSON.parse(decrypt(_user));
    //set TTL
    _user.ttl = await ttl(key);
    //set key
    _user.key = key;
    //Same ids
    if (_user._id !== decode._id)
      return cb(forbidden(req.res));

    //Verify Roles
    if (currentScopes)
      if (!hasRole(currentScopes, _user.roles))
        return cb(forbidden(req.res));
  //Success
    req.user = _user;
    return cb(null);
  } else {
    return cb(forbidden(req.res));
  }
}
