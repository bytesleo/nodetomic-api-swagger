//File
import fs from 'fs';
//Email
import * as utility from '../../lib/utility';
import * as Email from '../../lib/email';
const EmailTemplate = utility.getTemplate('templates/welcome.js'); //example with JS
const OtherTemplate = utility.getTemplate('templates/hi.html'); //Example with .html, .mustache

import config from '../../config';
import {
  result,
  error,
  invalid,
  notFound
}
from '../../lib/helper';

// Upload File

export function upload(req, res) {

  try {
    if (req.files) {
      //file with name file_upload in form
      let file = req.files.exampleFile;
      let path = `${config.base}/assets/${new Date().getTime()}_${file.name}`;

      file.mv(path, err => {
        if (err)
          throw err;

        res.status(201).json({
          message: 'File uploaded!',
          path
        });

      });

    } else {
      throw 'Not found files!';
    }
  } catch (err) {
    invalid(res, err);
  }

}

// Send Email

export function email(req, res) {

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodetomic 👻" <foo@blurdybloop.com>', // sender address
    to: 'example1@gmail.com, example2@gmail.com', // list of receivers
    subject: 'Welcome ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '' // html body
  };

  let values = {
    name: "Nodetomic",
    title: "Hi!"
  };

  EmailTemplate.then(template => {
    mailOptions.html = utility.setTemplate(template, values);
    //res.send(mailOptions.html); Uncomment to preview html
    Email.send(mailOptions)
      .then(result(res))
      .catch(error(res))
  });
}


// Preview Email

export function preview(req, res) {

  let PreviewTemplate = utility.getTemplate(
    `${req.swagger.params.folder.value}/${req.swagger.params.name.value}`);

  PreviewTemplate
    .then(result(res))
    .catch(error(res))

}
