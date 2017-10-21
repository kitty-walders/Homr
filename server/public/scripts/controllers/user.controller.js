myApp.controller('UserController', function (UserService, $location) {

  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.appliancesObj = UserService.appliancesObj;
  vm.myRelTasksObj = UserService.myRelTasksObj;
  vm.myTasksObj = UserService.myTasksObj;

  //send User's intake task date to the DB
  vm.gatherDate = function (taskdate) {
    UserService.gatherDate(taskdate);
  };

  //on page load, GET all appliances from DB to the DOM to allow users to pick their appliances
  vm.getAppliances = function () {
    UserService.getAppliances();
  };

  //get ALL tasks from DB to the DOM
  vm.getRelevantTasks = function () {
    UserService.getRelevantTasks();
  };

  //send User's appliances to the DB
  vm.gatherAppliances = function (myAppliance) {
    UserService.gatherAppliances(myAppliance);

  };

  //on button click- redirect users to /tasks
  vm.genHomr = function(){
    $location.path("/tasks");
  }

  //allow user to upload images
  vm.showPicker = function(task){
    UserService.showPicker(task);
  }

});

