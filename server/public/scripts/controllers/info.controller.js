myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.myTasksObj = UserService.myTasksObj;

  //get MY appliances in DB to the DOM
    vm.getMyTasks = function () {
      UserService.getMyTasks();
    };
    vm.getMyTasks();

    console.log('userService',vm.userService);
});
