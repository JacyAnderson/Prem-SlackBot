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

  getUsers();
  function getUsers() {
    $http 
    .get('http://localhost:3000/api/users')
    .then(function(response) {
      vm.all = response.data.users;
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