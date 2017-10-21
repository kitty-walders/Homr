var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var bodyParser = require('body-parser');

router.get('/', function (req, res) {
  console.log('inside the server GET ALL TASK');
    // check if logged in
    if (req.isAuthenticated()) {
      pool.connect(function (conErr, client, done) {
        if (conErr) {
          res.sendStatus(500);
        } else {
          client.query('SELECT * FROM tasks', function (queryErr, resultObj) {
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

router.post('/', function (req, res) {
  
  console.log('in the post?', req.body);
  var usersappId = req.body.usersapp_id;
  var taskId = req.body.task_id;
  var task_name = req.body.task_name;
  var task_description = req.body.task_description;
  var freq_day = req.body.freq_day;
  var freq_type = req.body.freq_type;
  var taskFcd = req.body.task_firstcompleteddate;
  var splTaskFcd = taskFcd.slice(0,10);
  var truthy = 'TRUE';

  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        console.log('conErr', conErr);
        res.sendStatus(500);
        
      } else {
        client.query("INSERT INTO mytasks (usersapp_id, task_id, task_name, task_description, freq_day, freq_type, firstcompleteddate, taskcompleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", 
        [usersappId, taskId, task_name, task_description, freq_day, freq_type, splTaskFcd, truthy], function (queryErr, resultObj) {
          done();
          if (queryErr) {
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    })
}else {
  // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
  res.send(false);
};
});

module.exports = router;
