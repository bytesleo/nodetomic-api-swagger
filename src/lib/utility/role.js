import config from '../../config';

// hasRole
export function hasRole(rolesRequired, rolesUser) {
  let isAuthorized = false;
  rolesRequired.forEach(rolReq => {
    if (rolesUser.includes(rolReq))
      isAuthorized = true;
    return;
  });
  return isAuthorized;
}
