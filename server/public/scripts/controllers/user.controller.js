myApp.controller('UserController', function (UserService, $location, $mdDialog) {

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
    console.log('my selected appliance', myAppliance);
  };

  //on button click- redirect users to /tasks
  vm.redirect = function () {
    $location.path("/tasks");
  };

  //allow user to upload images
  vm.pickAvatar = (event, task) => {    
    console.log('event', event);
    console.log('task', task);

    var confirm = $mdDialog.confirm()
    .title('Confirm Set Avatar')
    .textContent('this is the text that shows up in the filestack dialog.')
    .ariaLabel('Confirm Set Avatar')
    .targetEvent(event)
    .ok('Proceed')
    .cancel('Cancel');

  $mdDialog.show(confirm).then( function() {
    UserService.fileStack.pick({
      accept: 'image/*',
      maxFiles: 3
  }).then((result) => {    
      var convertedUrl = 'https://cdn.filestackcontent.com/' + 
                          'resize=w:200,h:200,f:crop/' +
                          result.filesUploaded[0].handle;

      var urlToAdd = {
        usersapp_id: task.usersapp_id,
        task_id: task.task_id,
        taskUrl : convertedUrl
      }
      
      UserService.putImage(urlToAdd);
    })
    },()=>{});
  };
});
