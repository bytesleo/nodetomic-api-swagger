import { result, error } from 'express-easy-helper';
import { send } from '../../lib/nodemailer';
import { getTemplate, setTemplate } from '../../lib/hogan';
const templateExample = getTemplate('/views/templates/example.html');

// Send a email
export async function index(req, res) {

  // Get template
  let template = await templateExample;
  // Values to replaces in template
  let values = {
    name: "Hello World! :)"
  };
  // Replace values in template
  let rendered = await setTemplate(template, values);
  // Options
  let options = {
    from: '"Your-app-name 👻" <example@example.com>', // sender address
    to: `${req.swagger.params.email.value}`, // list of receivers -> example1@gmail.com, example2@gmail.com, ...
    subject: 'Welcome ✔', // Subject line
    text: 'Hello world!', // plain text body
    html: rendered // html body
  };
  // Send
  send(options).then(result(res)).catch(error(res));

}
