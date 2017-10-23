myApp.service('UserService', function ($http, $location) {
  var self = this;

  self.userObject = {};
  self.appliancesObj = { appliances: [] };
  self.myTasksObj = { tasks: [] };
  self.myRelTasksObj = { tasks: [] };

  self.getuser = function () {
    $http({
      method: "GET",
      url: '/user'
    }).then(function (response) {
      if (response.data.username) {
        // user has a current session on the server
        self.userObject.userName = response.data.username;
      } else {
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    })
  };

  self.getAppliances = function () {
    //on page load, GET all appliances from DB to the DOM to allow users to pick their appliances
    $http({
      method: 'GET',
      url: '/appliances'
    }).then(function (res) {
      self.appliancesObj.appliances = res.data;
    });
  };

  self.genHomr = function () {
    $http({
      method: 'GET',
      url: '/homr'
    })
      .then(function (res) {
        self.myTasksObj.tasks = res.data;
      });
  };

  self.getRelevantTasks = function () {
    //For each selected appliance, GET the associated tasks so user can enter firstcompleteddate
    $http({
      method: 'GET',
      url: '/tasks'
    }).then(function (res) {
      self.myRelTasksObj.tasks = res.data;
    });
  };

  self.gatherDate = function (taskdate) {
    $http({
      method: 'POST',
      url: '/intake',
      data: taskdate,
    }).then(function (res) {
      console.log('response from server', res);

    })
  }

  self.gatherAppliances = function (myAppliance) {
    // POST my selected appliance to the DB
    $http({
      method: 'POST',
      url: '/appliances',
      data: myAppliance,
    })
      .then(function (res) {
        //For each selected appliance, GET the associated tasks so user can enter firstcompleteddate
        self.getRelevantTasks();
      });
  };

  self.markComplete = function (task) {
    var mytaskid = { mytask_id: task };

    console.log(' what is mytaskid?', mytaskid);
    //POST my completed task to the DB
    $http({
      method: "PUT",
      url: '/tasks',
      data: mytaskid
    }).then(function (response) {
      self.genHomr();
      swal({
        title: "WOW!",
        text: "You're awesome!",
        icon: "success",
        button: "Do more tasks"
      });
    });
  };


  self.showPicker = function (task) {
    console.log('showPicker button working to service');

    // var client = filestack.init('	AJEHYT3XfQHOk875kYhHiz');
    // client.pick({accept: 'image/*',
    // maxFiles: 5,
    // imageMax: [1024, 1024]});

    //PUT task image link as part of 
    // $http({
    //   method: "PUT",
    //   url: '/filestack',
    //   data: task
    // })
  }

  self.logout = function () {
    $http({
      method: "GET",
      url: '/user/logout',
    }).then(function (response) {
      $location.path("/home");
    });
  }
});
