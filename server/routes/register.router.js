var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function (req, res, next) {

  var saveUser = {
    username: req.body.username,
    phone_number: req.body.phone_number,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.postal_code,
    password: encryptLib.encryptPassword(req.body.password)
  };

  pool.connect(function (err, client, done) {
    if (err) {
      res.sendStatus(500);
      console.log('connection err', err);
    }
    client.query("INSERT INTO users (username, phone_number, address, city, state, postal_code, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [saveUser.username, saveUser.phone_number, saveUser.address, saveUser.city, saveUser.state, saveUser.postal_code, saveUser.password],
      function (err, result) {
        client.end();

        if (err) {
          res.sendStatus(500);
          console.log('query err', err);
        } else {
          res.sendStatus(201);
        }
      });
  });

});


module.exports = router;
