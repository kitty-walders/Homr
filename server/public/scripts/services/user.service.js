myApp.service('UserService', function ($http, $location) {
  var self = this;

  self.userObject = {};
  self.appliancesObj = { appliances: [] };
  self.myTasksObj = { tasks: [] };
  self.myRelTasksObj = { tasks: [] };
  self.fileStack = filestack.init('AJEHYT3XfQHOk875kYhHiz');

  self.getDaysinMilliseconds = function(days){
    return 1000 * 60 * 60 * 24 * days;
  };

  self.currentDate = new Date();
  self.currentDateString = self.currentDate.toISOString();
  self.sevenDaysFromToday = new Date(self.currentDate.valueOf() + self.getDaysinMilliseconds(7));
  self.formattedSevenDaysFromToday = self.sevenDaysFromToday.toISOString();

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

        self.myTasksObj.tasks.forEach(function(task){
          if(task.task_due_date <= self.currentDateString){
            var late = "late";
            task.late = true;
          } else if (task.task_due_date > self.currentDateString && task.task_due_date <= self.formattedSevenDaysFromToday) {
            var approaching = "approaching";
            task.approaching = true;
          } else if (task.task_due_date > self.currentDateString && task.task_due_date > self.formattedSevenDaysFromToday) {
            var future = "future";
            task.future = true;
          } 
          else {
            console.log('when is this due?');
          }
        })
      })
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
    console.log('gatherDate', taskdate);
    $http({
      method: 'POST',
      url: '/intake',
      data: taskdate,
    }).then(function (res) {
      console.log('response from server', res);
    })
  };

  self.genHomrDate = function (homrdate) {
    console.log('inside genHomrDate Service', homrdate);
    $http({
      method: 'POST',
      url: '/homr',
      data: homrdate,
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
    var mytask = { 
      mytask_id: task.mytask_id,
      firstcompleteddate: task.firstcompleteddate,
      freq_day: task.freq_day,
      freq_type: task.freq_type,
      task_due_date: task.task_due_date,
      task_completion_date: task.task_completion_date
    };
    
    //POST my completed task to the DB
    $http({
      method: "PUT",
      url: '/tasks',
      data: mytask
    }).then(function (response) {
      self.genNext(mytask);
    });
  };

  self.genNext = function(mytask){
    console.log('inside genNext mytask object?', mytask);
    $http({
      method: "POST",
      url: '/tasks',
      data: mytask
    }).then(
      function (response) {
        console.log('inserted new task!');
        self.genHomr();
        swal({
          title: "WOW!",
          text: "You're awesome!",
          icon: "success",
          button: "Do more tasks"
        });
  }
)};

  self.putImage = function (img) {
    // PUT task image link as part of task row
    $http({
      method: "PUT",
      url: '/filestack',
      data: img
    })
    .then(function (response) {
      swal({
        title: "Awesome job!",
        text: "Thanks for uploading an image!",
        icon: "success",
      });
      self.genHomr();
    });
  };

  self.addTaskDesc = function (descToAdd) {
    // PUT task description as part of task row
    $http({
      method: "PUT",
      url: '/intake',
      data: descToAdd
    })
    .then(function (response) {
      self.genHomr();
    });
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
