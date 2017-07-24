import Hogan from 'hogan.js';
import config from '../../config';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));


// Get Template
export async function getTemplate(path) {

  if (path.indexOf('.js') > -1) {
    return await require(`${config.base}/views/${path}`).default;
  } else {
    return await fs.readFileAsync(`${config.base}/views/${path}`, 'utf8');
  }

}

// Replace in Template
export async function setTemplate(template, values) {

  let HoganTemplate = await Hogan.compile(template);
  return await HoganTemplate.render(values);

}
