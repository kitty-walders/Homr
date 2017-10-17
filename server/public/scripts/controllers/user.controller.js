myApp.controller('UserController', function (UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.appliancesObj = UserService.appliancesObj;

  vm.getAppliances = function() {
    UserService.getAppliances();
    console.log('inside controller getAppliances');
};

  vm.getAppliances();
});
