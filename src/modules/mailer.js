const nodemailer = require('nodemailer');
const path = require('path')
require('dotenv').config()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.API_USER,
    pass: process.env.API_PASSWORD
  }
});

module.exports = transport