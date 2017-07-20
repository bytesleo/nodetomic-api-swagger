import * as CryptoJS from 'crypto-js';
import Hogan from 'hogan.js';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
import config from '../../config';
//Setup email
import * as nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({service: 'gmail', auth: config.email.auth});
// const transporter = nodemailer.createTransport(smtpTransport(config.email));

// Encrypt
export function encrypt(text) {

  return CryptoJS.AES.encrypt(text, config.secret).toString();

}

// Decrypt
export function decrypt(ciphertext) {

  let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), config.secret);
  return bytes.toString(CryptoJS.enc.Utf8);

}

// Make random string
export function makeid(length) {

  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;

}

// hasRole
export function hasRole(rolesRequired, rolesUser) {
  let isAuthorized = false;
  rolesRequired.forEach(rolReq => {
    if (rolesUser.includes(rolReq))
      isAuthorized = true;
    return;
  });
  return isAuthorized;
}


// Calculate time rol
export function calculateTTL(roles) {
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
            } else if (item.time){
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

// Get Template
export function getTemplate(path) {

  if (path.indexOf('.js') > -1) {
    return Promise.resolve(require(`${config.base}/views/${path}`).default);
  } else {
    return fs.readFileAsync(`${config.base}/views/${path}`, 'utf8');
  }

}

// Replace in Template
export function setTemplate(template, values) {

  let HoganTemplate = Hogan.compile(template);
  return HoganTemplate.render(values);

}

// Send Email

export function sendEmail(message) {
  return Promise.resolve(transporter.sendMail(message), transporter.close());
}
