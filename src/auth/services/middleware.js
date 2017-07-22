import {unauthorized, forbidden} from 'express-easy-helper';
import {verify} from '../../lib/token';
import {exits as rsExits, ttl as rsTtl} from '../../lib/redis/rs';
import {get as ruGet} from '../../lib/redis/ru';
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

    // Verify if exits token in redis
    if (!await rsExits(key))
      return cb(unauthorized(req.res));

    // Extract info user from redis
    let _user = await ruGet(decode._id);
    if (!_user)
      return cb(unauthorized(req.res));

    //decrypt redis
    _user = await JSON.parse(decrypt(_user));
    //set TTL
    _user.ttl = await rsTtl(key);
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
