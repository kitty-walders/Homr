var express = require('express');
var router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// //get all appliances from database
// router.get('/appliances', function(req,res) {
//   console.log('inside the get /appliances route');
//     //check if user is logged in
//     if(req.isAuthenticated()){
//       console.log('logged in user and get appliances');
//       pool.connect(function(err, client, done) {
//         if(err) {
//           console.log("Error connecting: ", err);
//           res.sendStatus(500);
//         }
//         client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
//           [saveUser.username, saveUser.password],
//             function (err, result) {
//               client.end();
    
//               if(err) {
//                 console.log("Error inserting data: ", err);
//                 res.sendStatus(500);
//               } else {
//                 res.sendStatus(201);
//               }
//             });
//       });
//     }
// });

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
