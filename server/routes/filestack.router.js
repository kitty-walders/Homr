var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
require('dotenv').config();
var request = require('request');

// API Key & username are environment variables in Heroku
var filestack = process.env.FILESTACK_API_KEY;
// var client = filestack.init('filestack');

  // router.put('/', function(req, res){
  //   client.pick({
  //     accept: 'image/*',
  //     maxFiles: 1,
  //     imageMax: [1024, 1024]
  //   }).then(function (result){
  //     console.log('result from FILESTACK', result);
  //     console.log(JSON.stringify(result.filesUploaded))


  // // check if logged in
  // if (req.isAuthenticated()) {
  //   pool.connect(function (conErr, client, done) {
  //     if (conErr) {
  //       res.sendStatus(500);
 
  //     } else {
  //       client.query("UPDATE mytasks SET task_completion_date= CURRENT_TIMESTAMP WHERE mytask_id = $1", [mytaskid], function (queryErr, resultObj) {
  //         done();
  //         if (queryErr) {
  //           res.sendStatus(500);
  //         } else {
  //           res.sendStatus(200)
  //         }
  //       });
  //     }
  //   })
  // } else {
  //   // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
  //   res.send(false);
  // }
//     })
// });

module.exports = router;
