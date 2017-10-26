var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var nodemailer = require('nodemailer');
require('dotenv').config();
// var twilio = require('twilio');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USERNAME, //YOUR GMAIL USER HERE
    pass: process.env.MAIL_PASSWORD //YOUR GMAIL PASSWORD
  }
});

// var client = twilio(config.accountSid, config.authToken);
// // var tmClient = new TMClient('USERNAME', 'API KEY');

router.post('/', function(req, res) {
  var mailer = req.body;
  var userEmail = req.body.user_email.userName;

  var mailOptions = {
    from: '"HOMR"' + process.env.USERNAME + "'", // sender address -> //YOUR GMAIL USER HERE IN STRING + email not in string! -> EXAMPLE@gmail.com
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

// router.post('/text', function(req, res) {
//   console.log('req body: ', req.body);
//   client.messages.create(
//     {
//       to: req.body.toNumber,
//       from: config.numberSRC,
//       body:
//         'Your next appointment is on ' + req.body.date[0] + ' at ' + req.body.time + '.  We can wait to see you then!' // plain text body,
//     },
//     function(err, message) {
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//       } else {
//         console.log(message.sid);
//         res.sendStatus(200);
//       }
//     }
//   );
// });

module.exports = router;
