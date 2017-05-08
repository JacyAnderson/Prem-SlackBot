// Create angular app called prem-slackbot
angular.module("prem-slackbot", [])
.controller('AdminCtrl', AdminCtrl);

// Inject $http so minification is possible
AdminCtrl.$inject = ['$http'];

// AdminCtrl controller gets users and sessions from backend
function AdminCtrl($http) {

  // Set vm to this for proper scope
  var vm = this;
  vm.all=[];
  vm.addUser = addUser;
  vm.getUsers = getUsers;
  vm.allSessions = [];
  vm.getSessions = getSessions;

  // Call get users
  getUsers();

  // getUsers function gets users from backend api
  function getUsers() {
    $http 
    .get('http://localhost:3000/api/users')
    .then(function(response) {
      // stores users from response into vm.allSessions
      vm.all = response.data;
    });
  }

  // Call get sessions
  getSessions();

  // getSessions function gets sessions from backend api
  function getSessions() {
    $http 
    .get('http://localhost:3000/api/sessions')
    .then(function(response) {
      // stores sesssions from response into vm.allSessions
      vm.allSessions = response.data;
    });
  }
}