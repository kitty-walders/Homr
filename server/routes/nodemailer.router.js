var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var nodemailer = require('nodemailer');
require('dotenv').config();


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USERNAME, 
    pass: process.env.MAIL_PASSWORD
  }
});


router.post('/', function(req, res) {
  var mailer = req.body;
  var userEmail = req.body.user_email.userName;

  var mailOptions = {
    from: '"HOMR"' + process.env.USERNAME + "'", 
    to: userEmail, // list of receivers
    subject: "'" + mailer.task_name + "'", // Subject line
    text: mailer.task_name + ' is due on ' + mailer.task_due_date, // plain text body
    html:
      '<b>' +
      mailer.task_description +
      '</b>'
      // html body
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    } else {
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.sendStatus(200);
    }
  });

  res.sendStatus(200);
});


module.exports = router;
