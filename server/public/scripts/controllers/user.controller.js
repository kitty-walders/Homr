myApp.controller('UserController', function (UserService) {

  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.appliancesObj = UserService.appliancesObj;
  vm.allTasksObj = UserService.allTasksObj;

  //get all appliances in DB to the DOM
  vm.getAppliances = function () {
    UserService.getAppliances();
    swal("Let's get started with Homr!", 
    "First things first. Fill out our intake form to start generating your Homr schedule!");
  };

  //filter through array of selected appliances and pull out only the applaince_id
  vm.submitForm = function () {
    var selectedAppliances = (
      vm.appliancesObj.appliances.filter(function (appliance) {
        return appliance.isChecked;
      }).map(function(appliance){return appliance.appliance_id})
    );

    var myAppliances = {
      myAppliances: selectedAppliances,
    };
    UserService.myAppliances(myAppliances);
  };

    //get ALL tasks from DB to the DOM
    vm.getAllTasks = function () {
      UserService.getAllTasks();
    };
    vm.getAllTasks();
});

  