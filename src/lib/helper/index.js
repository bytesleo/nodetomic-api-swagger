import jsonpatch from 'fast-json-patch';

export function result(res, statusCode) {
  return (entity) => {
    if (entity) {
      return res.status(statusCode || 200).json(entity);
    }
    return null;
  };
}

export function error(res, statusCode) {
  const status = statusCode || 500;
  return (err) => {
    if (err) {
      return res.status(status).json({
        message: err,
      });
    }
    return null;
  };
}

export function notFound(res) {
  return (entity) => {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}


export function patch(patches) {
  return (entity) => {
    try {
      jsonpatch.applyPatch(entity, patches, /* validate */ true);
    } catch (err) {
      return Promise.reject(err);
    }
    return entity.save();
  };
}


export function remove(res) {
  return (entity) => {
    if (entity) {
      return entity.remove()
        .then(() => {
          console.log('dd');
          res.status(200).json({
            message: 'entity deleted',
          });
        });
    }
    return null;
  };
}


export function invalid(res, err, statusCode) {

  const status = statusCode || 500;

  if (err) {
    return res.status(status).json({
      message: err,
    });
  }
  return null;

}
