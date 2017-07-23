import {result, error} from 'express-easy-helper';
import {getTemplate, setTemplate, sendEmail} from '../../lib/utility';
const ExampleTemplate = getTemplate('templates/example.html'); //Example with .html, .mustache, .js

// Send a email
export function index(req, res) {

  let options = {
    from: '"Your-app-name 👻" <example@example.com>', // sender address
    to: `${req.swagger.params.email.value}`, // list of receivers -> example1@gmail.com, example2@gmail.com, ...
    subject: 'Welcome ✔', // Subject line
    text: 'Hello world!', // plain text body
    html: '' // html body
  };

  let values = {
    name: "Hello World! :)"
  };

  ExampleTemplate.then(template => {
    options.html = setTemplate(template, values);
    //res.send(options.html); Uncomment to preview html
    sendEmail(options).then(result(res)).catch(error(res));
  });

}
