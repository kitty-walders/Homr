myApp.controller('UserController', function (UserService) {

  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.appliancesObj = UserService.appliancesObj;
  vm.myRelTasksObj = UserService.myRelTasksObj;
  vm.allTasksObj = UserService.allTasksObj;
  vm.myTasksObj = UserService.myTasksObj;

  //send User's intake task date to the DB
  vm.gatherDate = function (taskdate) {
    UserService.gatherDate(taskdate);
  };

  //get all appliances in DB to the DOM
  vm.getAppliances = function () {
    UserService.getAppliances();
    // swal("Let's get started with Homr!", 
    // "First things first. Fill out our intake form to start generating your Homr schedule!");
  };

  //get ALL tasks from DB to the DOM
  vm.getRelevantTasks = function () {
    UserService.getRelevantTasks();
  };

  //send User's appliances to the DB
  vm.gatherAppliances = function (myAppliance) {
    UserService.gatherAppliances(myAppliance);

  };

  vm.genHomr = function(){
    UserService.genHomr();
  }

});

