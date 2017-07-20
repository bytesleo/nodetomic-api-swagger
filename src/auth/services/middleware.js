import api from 'express-easy-helper';
import {verify} from '../../lib/token';
import {get as redis, ttl} from '../../lib/redis';
import {decrypt, hasRole} from '../../lib/utility';

// verifyToken
export async function verifyToken(req, authOrSecDef, token, cb) {

  function sendNotLoggedIn() {
    return api.unauthorized(req.res, {message: 'Unauthorized'});
  }

  function sendError() {
    return api.forbidden(req.res, {message: 'Access Denied'});
  }
  //these are the scopes/roles defined for the current endpoint
  let currentScopes = req.swagger.operation["x-security-scopes"];
  // console.log('Require:', currentScopes);
  if (token) {
    // Bearer
    req.headers.authorization = `Bearer ${token}`;
    //Verify Token
    let decode = await verify(token);
    if (!decode)
      return cb(sendError());
    let key = `${decode._id}:${decode._verify}`;
    //Extract info from redis
    let _user = await redis(key);
    if (!_user)
      return cb(sendNotLoggedIn());

    //decrypt redis
    _user = await JSON.parse(decrypt(_user));
    //set TTL
    _user.ttl = await ttl(key);
    //set key
    _user.key = key;
    //Same ids
    if (_user._id !== decode._id)
      return cb(sendError());

    //Verify Roles
    if (currentScopes)
      if (!hasRole(currentScopes, _user.roles))
        return cb(sendError());
  //Success
    req.user = _user;
    return cb(null);
  } else {
    return cb(sendError());
  }
}
