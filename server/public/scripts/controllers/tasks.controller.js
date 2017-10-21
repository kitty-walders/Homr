myApp.controller('TasksController', function (UserService) {
  console.log('TasksController created');
  var vm = this;
  vm.userService = UserService;
  vm.myTasksObj = UserService.myTasksObj;
  vm.allTasksObj = UserService.allTasksObj;


  vm.genHomr = function(){
    UserService.genHomr();
  }

  vm.markComplete = function (index) {
    var mytaskid = (index + 1)
    console.log('mytaskid', mytaskid);
    UserService.markComplete(mytaskid);
  };

  //get ALL tasks from DB to the DOM
  vm.getAllTasks = function () {
    UserService.getAllTasks();
  };
});
