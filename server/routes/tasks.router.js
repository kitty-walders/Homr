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
      } else {
        client.query('SELECT * FROM tasks INNER JOIN mytasks ON mytasks.task_id = tasks.task_id INNER JOIN users_appliances ON users_appliances.usersapp_id= mytasks.usersapp_id WHERE user_id = $1', [userId], function (queryErr, resultObj) {
          done();
          if (queryErr) {
            res.sendStatus(500);
          } else {
            res.send(resultObj.rows);
          }
        });
      }
    })
  } else {
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

router.put('/', function (req, res) {
  var mytaskid = req.body.task_id;
  console.log('inside the server router PUT', mytaskid);

  // check if logged in
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);
      } else {
        client.query("UPDATE mytasks SET taskcompleted= 'TRUE', task_completion_date= CURRENT_TIMESTAMP WHERE mytask_id = $1", [mytaskid], function (queryErr, resultObj) {
          done();
          if (queryErr) {
            res.sendStatus(500);
          } else {
            res.send(resultObj.rows);
            console.log('WORKING?!?!?!?!');
          }
        });
      }
    })
  } else {
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }

});

module.exports = router;
