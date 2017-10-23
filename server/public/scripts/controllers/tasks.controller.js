myApp.controller('TasksController', function (UserService) {

  var vm = this;
  vm.userService = UserService;
  vm.myTasksObj = UserService.myTasksObj;


  vm.genHomr = function () {
    UserService.genHomr();
  };

  vm.markComplete = function (task) {
    UserService.markComplete(task);
  };

});
