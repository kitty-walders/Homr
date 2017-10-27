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
  var taskFcd = req.body.task_firstcompleteddate;
  var splTaskFcd = taskFcd.slice(0, 10);
  var task_due_date = moment(splTaskFcd, "YYYY-MM-DD").add(freq_day, 'days').calendar();
  var spltask_due_date = task_due_date.slice(0, 10)

  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);

      } else {
        client.query("INSERT INTO mytasks (usersapp_id, task_id, task_name, task_description, freq_day, freq_type, firstcompleteddate, task_due_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [usersappId, taskId, task_name, task_description, freq_day, freq_type, splTaskFcd, spltask_due_date], function (queryErr, resultObj) {
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

module.exports = router;
