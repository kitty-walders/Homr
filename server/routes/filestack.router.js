var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.put('/', function (req, res) {
    console.log('req??', req.body)
    var taskUrl = req.body.taskUrl;
    var task_id = req.body.task_id;
    var usersapp_id = req.body.usersapp_id
    // check if logged in
    if (req.isAuthenticated()) {
        pool.connect(function (conErr, client, done) {
            if (conErr) {
                res.sendStatus(500);
            } else {
                client.query("UPDATE mytasks SET task_url= $1 WHERE task_id = $2 AND usersapp_id = $3", [taskUrl, task_id, usersapp_id], function (queryErr, resultObj) {
                    done();
                    if (queryErr) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200)
                    }
                });
            }
        })
    } else {
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    }
})


module.exports = router;
