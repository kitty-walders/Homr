myApp.service('UserService', function($http, $location){
  var self = this;

  self.userObject = {};
  self.appliancesObj = {appliances: []};
  self.myTasksObj = {tasks: []};
  self.allTasksObj = {tasks: []};
  self.myRelTasksObj = {tasks: []};

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

      });
    }; 

    self.genHomr = function () {
      console.log('inside the genHomr');
      $http({
        method:'GET',
        url:'/homr'
      })
      .then(function(res) {
          self.myTasksObj.tasks = res.data;
      });
    }; 

    self.getRelevantTasks=function(){
      $http({
        method: 'GET',
        url: '/tasks'
    }).then(function(res) {
        self.myRelTasksObj.tasks = res.data;
    });
      };

    self.getAllTasks = function(){
      $http({
        method: 'GET',
        url: '/intake'
    }).then(function(res) {
        self.allTasksObj.tasks = res.data;
    });
    };

    self.gatherDate = function(taskdate){
      console.log('inside gatherDate SERVICE', taskdate);
      
      $http({
        method: 'POST',
        url: '/intake',
        data: taskdate,
      }).then(function(res){
        console.log('response from server', res);

      })
    }

    self.gatherAppliances = function (myAppliance) {
      console.log('SERVICE myAppliance', myAppliance);

      // POST my selected appliances to the DB
      $http({
        method: 'POST',
        url: '/appliances',
        data: myAppliance,
      })
      .then(function (res) {
        console.log('added an appliance');
        self.getRelevantTasks();
        // swal({
        //   title: "Good job!",
        //   text: "Thanks for adding your appliances to Homr",
        //   icon: "success",
        //   button: "Go to Homr Tasks!",
        // });
        // //redirect to the /user page after completed intake form
        // $location.path("/user");
      });
    };

    self.markComplete = function(taskid){
      console.log('marked as completed', taskid);
      var mytaskid = {mytask_id: taskid};
      //POST my completed tasks to the DB
      $http({
        method: "PUT",
        url: '/tasks',
        data: mytaskid
      }).then(function(response) {
        self.genHomr();
        swal({
          title: "WOW!",
          text: "You're awesome!",
          icon: "success",
          button: "Do more tasks",
        });
      });
    };

    self.logout = function() {
      $http({
        method: "GET",
        url: '/user/logout',
      }).then(function(response) {
        $location.path("/home");
      });
    }
});
