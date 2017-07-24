import config from '../../config';

// Calculate time session by rol
export function ttl(roles) {
  try {
    if (roles.length > 0) {
      let array = [];
      let isInfinite = false;
      roles.forEach(rol => {
        config.roles.forEach(item => {
          if (rol === item.rol) {
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
