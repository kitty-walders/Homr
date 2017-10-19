myApp.controller('TasksController', function(UserService) {
  console.log('TasksController created');
  var vm = this;
  vm.userService = UserService;
  vm.myTasksObj = UserService.myTasksObj;

  //get MY appliances in DB to the DOM
    vm.getMyTasks = function () {
      UserService.getMyTasks();
    };
    vm.getMyTasks();

    console.log('userService',vm.userService);

    vm.markComplete = function (index) {
      var mytaskid = (index + 1)
      console.log('mytaskid', mytaskid);
      UserService.markComplete(mytaskid);
    };

});
