import Hogan from 'hogan.js';
import config from '../../config';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));


// Get Template
export async function getTemplate(path) {

  return await (path.indexOf('.js') > -1) ? require(`${config.base}/views/${path}`).default : fs.readFileAsync(`${config.base}/views/${path}`, 'utf8');
}

// Replace in Template
export async function setTemplate(template, values) {

  let HoganTemplate = await Hogan.compile(template);
  return await HoganTemplate.render(values);

}
