var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

require('dotenv').config()


console.log(process.env.SENDGRID_API_PASSWORD)
var options = {
  auth: {
    api_user: process.env.SENDGRID_API_USER, // SG username
    api_key: process.env.SENDGRID_API_PASSWORD // SG password
  }
}

var client = nodemailer.createTransport(sgTransport(options));

// var email = {
//   from: 'thiago_kauai@hotmail.com',
//   to: '',
//   subject: 'Hello',
//   text: 'Hello world',
//   html: '<b>Hello world</b>'
// };

client.use('compile',hbs({
    viewEngine:{
        extName: '.html',
        partialsDir:'./resource/mail/',
        layoutsDir:'./resource/mail/',
        defaultLayout: 'auth/forgot_password.html',
    },
    viewPath:path.resolve('./resource/mail/'),
    extName:'.html'
}))


// client.sendMail(email, function(err, info){
//     if (err ){
//       console.log(error);
//     }
//     else {
//       console.log('Message sent: ' + info.response);
//     }
// });

module.exports = client