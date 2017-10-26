var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var bodyParser = require('body-parser');
var moment = require('moment');
moment().format();

router.post('/', function (req, res) {

  var usersappId = req.body.usersapp_id;
  var taskId = req.body.task_id;
  var task_name = req.body.task_name;
  var task_description = req.body.task_description;
  var freq_day = req.body.freq_day;
  var freq_type = req.body.freq_type;

  if (freq_type == null){
    var taskFcd = new Date();
    var task_due_date = new Date();
  } else if (freq_type == "Spring"){
    var taskFcd = new Date();
    var task_due_date = '2018-03-01'
  } else if (freq_type == "Summer"){
    var taskFcd = new Date();
    var task_due_date = '2018-06-01'
  } else if (freq_type == "Fall"){
    var taskFcd = new Date();
    var task_due_date = '2017-09-01'
  } else if (freq_type == "Winter"){
    var taskFcd = new Date();
    var task_due_date = '2017-12-01'
  } else {
    console.log('idk what season this task is am in');
  }

  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);

      } else {
        client.query("INSERT INTO mytasks (usersapp_id, task_id, task_name, task_description, freq_day, freq_type, firstcompleteddate, task_due_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [usersappId, taskId, task_name, task_description, freq_day, freq_type, taskFcd, task_due_date], function (queryErr, resultObj) {
            done();
            if (queryErr) {
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          });
      }
    })
  } else {
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  };
});


router.get('/', function (req, res) {
  var userId = req.user.id;
  // check if logged in
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);
      } else {
        client.query('SELECT * FROM users_appliances INNER JOIN mytasks ON mytasks.usersapp_id = users_appliances.usersapp_id WHERE user_id = $1', [userId], function (queryErr, resultObj) {
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

module.exports = router;
