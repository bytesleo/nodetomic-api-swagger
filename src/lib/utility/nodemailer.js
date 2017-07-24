import * as nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '../../config';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({service: 'gmail', auth: config.email.auth});
// const transporter = nodemailer.createTransport(smtpTransport(config.email));

// Send Email
export async function send(message) {

  let r = await transporter.sendMail(message);
  await transporter.close()
  return r;

}
