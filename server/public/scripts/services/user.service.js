myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;

  self.userObject = {};
  self.appliancesObj = {appliance: []};

    self.getuser = function(){
      // console.log('UserService -- getuser');
      $http({
        method: "GET",
        url: '/user'
      }).then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
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
      console.log('UserService -> getAppliances line 27');
      $http({
          method: 'GET',
          url: '/appliances'
      }).then(function(res) {
          self.appliancesObj.appliance = res.data;
          console.log('in service and back from server', self.appliancesObj.appliance);
      });
  }; 

    self.logout = function() {
      // console.log('UserService -- logout');
      $http({
        method: "GET",
        url: '/user/logout',
      }).then(function(response) {
        // console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }
});
