myApp.service('UserService', function($http, $location){
  var self = this;

  self.userObject = {};
  self.appliancesObj = {appliances: []};

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
          console.log('in service and back from server', self.appliancesObj.appliances);
      });
    }; 

    self.myAppliances = function (myAppliances) {
      console.log('in the service of myAppliances', myAppliances);
      $http({
        method: 'POST',
        url: '/appliances',
        data: myAppliances,
      })
      .then(function (res) {
        console.log('Service has working POST for myAppliances');
        swal({
          title: "Good job!",
          text: "Thanks for adding your appliances to Homr",
          icon: "success",
          button: "cool beans!",
        });
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
