var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var bodyParser = require('body-parser');

router.get('/', function (req, res) {
  var userId = req.user.id;
  // check if logged in
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);
        console.log('task router conErr', conErr);
      } else {
        client.query('SELECT * FROM users_appliances INNER JOIN mytasks ON mytasks.usersapp_id = users_appliances.usersapp_id WHERE user_id = $1', [userId], function (queryErr, resultObj) {
          done();
          if (queryErr) {
            res.sendStatus(500);
            console.log('task router queryErr', queryErr);
          } else {
            res.send(resultObj.rows);
            console.log('task router resultObj.rows', resultObj.rows);
          }
        });
      }
    })
  } else {
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// router.put('/', function (req, res) {
//   var mytaskid = req.body.task_id;
//   console.log('inside the server router PUT', mytaskid);

//   // check if logged in
//   if (req.isAuthenticated()) {
//     pool.connect(function (conErr, client, done) {
//       if (conErr) {
//         res.sendStatus(500);
//       } else {
//         client.query("UPDATE mytasks SET taskcompleted= 'TRUE', task_completion_date= CURRENT_TIMESTAMP WHERE mytask_id = $1", [mytaskid], function (queryErr, resultObj) {
//           done();
//           if (queryErr) {
//             res.sendStatus(500);
//           } else {
//             res.sendStatus(200);
//           }
//         });
//       }
//     })
//   } else {
//     // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
//     res.send(false);
//   }

// });

module.exports = router;
