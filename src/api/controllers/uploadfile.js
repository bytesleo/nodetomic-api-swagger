import { result, error } from 'express-easy-helper';
import config from '../../config';

// Upload a file
export function index(req, res) {
  try {
    if (req.files) {
      //file with name 'example' in form
      let file = req.files.example;
      let path = `/assets/${new Date().getTime()}_${file.name}`;

      file.mv(`${config.base}/${path}`, err => {
        if (err)
          throw err;
        result(res, 201, { message: `file upload: ${path}` });
      });

    } else {
      throw 'Not found files!';
    }
  } catch (err) {
    error(res, err);
  }
}
