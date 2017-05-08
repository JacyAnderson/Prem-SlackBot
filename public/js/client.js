angular.module("prem-slackbot", [])
.controller('AdminCtrl', AdminCtrl);

// Controllers
AdminCtrl.$inject = ['$http'];

function AdminCtrl($http) {
  var vm = this;
  vm.all=[];
  vm.addUser = addUser;
  vm.newUser = {};
  vm.getUsers = getUsers;
  vm.deleteUser = deleteUser;
  vm.allSessions = [];
  vm.getSessions = getSessions;

  getUsers();
  function getUsers() {
    console.log('getting users');
    $http 
    .get('http://localhost:3000/api/users')
    .then(function(response) {
      console.log(response.data);
      vm.all = response.data;
      console.log(vm.all);
    });
  }

  getSessions();
  function getSessions() {
    console.log('getting users');
    $http 
    .get('http://localhost:3000/api/sessions')
    .then(function(response) {
      console.log(response.data);
      vm.allSessions = response.data;
      console.log(vm.allSessions);
    });
  }


  function addUser() {
    $http
    .post('http://localhost:3000/api/users')
    .then(function(response) {
      getUsers();
    });
    vm.newUser = {};
  }

  function deleteUser(user) {
    $http
      .delete('http://localhost:3000/api/users/' + user._id)
      .then(function(response) {
        var index = vm.all.indexOf(user);
        self.all.splice(index, 1);
      });
  }
}