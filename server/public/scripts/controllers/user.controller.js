myApp.controller('UserController', function (UserService) {

  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.appliancesObj = UserService.appliancesObj;

  //get all appliances in DB to the DOM
  vm.getAppliances = function () {
    UserService.getAppliances();
    console.log('inside controller getAppliances');
  };

  // //load all appliances from DB as part of Intake Form
  // vm.getAppliances();

  vm.submitForm = function () {
    var selectedAppliances = (
      vm.appliancesObj.appliances.filter(function (appliance) {
        return appliance.isChecked;
      })
    );
    var myAppliances = {
      myAppliances: selectedAppliances,
    };

    UserService.myAppliances(myAppliances);
  }
});
