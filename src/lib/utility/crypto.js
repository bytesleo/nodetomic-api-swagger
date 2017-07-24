import * as CryptoJS from 'crypto-js';
import config from '../../config';

// Encrypt
export function encrypt(text) {

  return CryptoJS.AES.encrypt(text, config.secret).toString();

}

// Decrypt
export function decrypt(ciphertext) {

  let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), config.secret);
  return bytes.toString(CryptoJS.enc.Utf8);

}
