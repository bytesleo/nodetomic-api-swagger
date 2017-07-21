import {result, error} from 'express-easy-helper';
import * as utility from '../../lib/utility';
const ExampleTemplate = utility.getTemplate('templates/example.html'); //Example with .html, .mustache, .js

export function index(req, res) {

  // setup email data with unicode symbols
  let options = {
    from: '"Nodetomic 👻" <foo@blurdybloop.com>', // sender address
    to: 'example1@gmail.com, example2@gmail.com', // list of receivers
    subject: 'Welcome ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '' // html body
  };

  let values = {
    name: "Hello World! :)"
  };

  ExampleTemplate.then(template => {
    options.html = utility.setTemplate(template, values);
    //res.send(options.html); Uncomment to preview html
    utility.sendEmail(options).then(result(res)).catch(error(res));
  });
}
