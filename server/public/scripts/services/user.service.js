myApp.service('UserService', function($http, $location){
  var self = this;

  self.userObject = {};
  self.appliancesObj = {appliances: []};
  self.myTasksObj = {tasks: []};

    self.getuser = function(){
      $http({
        method: "GET",
        url: '/user'
      }).then(function(response) {
          if(response.data.username) {
              // user has a current session on the server
              self.userObject.userName = response.data.username;
              // console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      })
    };

    self.getAppliances = function () {
      $http({
          method: 'GET',
          url: '/appliances'
      }).then(function(res) {
          self.appliancesObj.appliances = res.data;
          console.log('GET all appliances in DB', self.appliancesObj.appliances);
      });
    }; 

    self.getMyTasks = function () {
      $http({
          method: 'GET',
          url: '/tasks'
      }).then(function(res) {
          self.myTasksObj.tasks = res.data;
          console.log('in GET MY TASKS', self.myTasksObj);
      });
    }; 

    self.myAppliances = function (myAppliances) {
      console.log('GET MY appliances', myAppliances);
      //POST my selected appliances to the DB
      $http({
        method: 'POST',
        url: '/appliances',
        data: myAppliances,
      })
      .then(function (res) {
        swal({
          title: "Good job!",
          text: "Thanks for adding your appliances to Homr",
          icon: "success",
          button: "Go to Homr Tasks!",
        });
        //redirect to the /info page after completed intake form
        $location.path("/info");
      });
    }

    self.logout = function() {
      $http({
        method: "GET",
        url: '/user/logout',
      }).then(function(response) {
        $location.path("/home");
      });
    }
});
