myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.myTasks = UserService.myTasks;

  //get MY appliances in DB to the DOM
    vm.getMyTasks = function () {
      UserService.getMyTasks();
      console.log('inside infoController GET');
    };

    vm.getMyTasks();
});
