import config from '../../config';

// has Role
export function hasRole(requiredRoles, userRoles) {
  let isAuthorized = false;
  requiredRoles.forEach(role => {
    if (userRoles.includes(role))
      isAuthorized = true;
    return;
  });
  return isAuthorized;
}

// Time ttl by role
export function ttlRole(roles) {
  try {
    if (roles.length > 0) {
      let array = [];
      let isInfinite = false;
      roles.forEach(role => {
        config.roles.forEach(item => {
          if (role === item.role) {
            if (item.time === 'infinite') {
              isInfinite = true;
              return;
            } else if (item.time) {
              array.push(item.time);
            }
          }
        });
      });
      if (isInfinite) {
        return null;
      } else {
        return parseInt(Math.max.apply(Math, array)) * 60;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
