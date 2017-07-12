import * as RedisJwt from '../redisJwt';
// import * as Token from '../token';
// import * as utility from '../utility';

// Middleware
export function verifyToken(req, authOrSecDef, token, cb) {
  //these are the scopes/roles defined for the current endpoint
  var currentScopes = req.swagger.operation["x-security-scopes"];

  function error() {
    return req.res.status(403).json({
      message: "Error: Access Denied"
    });

  }

  console.log('currentScopes', currentScopes);
  console.log('authOrSecDef', authOrSecDef);
  console.log('token', token);

  if (token) {

    console.log('Cool, extract token ', token);

  } else {
    return cb(error());
  }

}

// hasRole
export function hasRole(rolesRequired, rolesUser) {
  try {
    let isAuthorized = false;
    rolesRequired.forEach(rolReq => {
      rolesUser.forEach(RolUser => {
        if (rolReq === RolUser)
          isAuthorized = true;
      });
    });
    return isAuthorized;
  } catch (err) {
    return false;
  }
}
