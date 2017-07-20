import api from 'express-easy-helper';
import fs from 'fs';
import config from '../../config';

// Upload File

export function index(req, res) {

  try {
    if (req.files) {
      //file with name file_upload in form
      let file = req.files.exampleFile;
      let path = `${config.base}/assets/${new Date().getTime()}_${file.name}`;

      file.mv(path, err => {
        if (err)
          throw err;

        api.ok(res, 201, {message: `file upload: ${path}`});

      });

    } else {
      throw 'Not found files!';
    }
  } catch (err) {
    api.error(res, err);
  }

}
