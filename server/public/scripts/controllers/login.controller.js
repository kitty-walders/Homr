myApp.controller('LoginController', function ($http, $location, UserService) {
  var vm = this;
  vm.user = {
    username: '',
    password: ''
  };
  vm.message = '';

  vm.login = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username and password!";
    } else {
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          // location works with SPA (ng-route)
          $location.path('/user'); // http://localhost:5000/#/user
        } else {
          vm.message = "Wrong!!";
        }
      }).catch(function (response) {
        vm.message = "Wrong!!";
      });
    }
  };

  vm.registerUser = function () {
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Choose a username and password!";
    } else {
      $http.post('/register', vm.user).then(function (response) {
        $location.path('/home');
      }).catch(function (response) {
        vm.message = "Please try again."
      });
    }
  }
});
