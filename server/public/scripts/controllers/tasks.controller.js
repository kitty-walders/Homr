myApp.controller('TasksController', function (UserService) {

  var vm = this;
  vm.userService = UserService;
  vm.myTasksObj = UserService.myTasksObj;


  vm.genHomr = function () {
    UserService.genHomr();
  };

  vm.genNextTask = function () {
    UserService.genNextTask();
  };

  vm.markComplete = function (mytaskid) {
    UserService.markComplete(mytaskid);
  };

});
