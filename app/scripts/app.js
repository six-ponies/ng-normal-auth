'use strict';

angular.module('phonecatApp', [
  'phoneList',
  'phoneDetail',
  'ngRoute',
  'ui.router',
  'ng-normal-auth'
]);
angular.module('phonecatApp').
config(function($stateProvider, $routeProvider, USER_ROLES) {

  $stateProvider.state('phones', {
    url: '/phones',
    template: '<phone-list></phone-list>',
    data: {
      authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
    }
  });
});
angular.module('phonecatApp').controller('ApplicationController', function($scope, USER_ROLES) {
  $scope.currentUser = null;
  $scope.USER_ROLES = USER_ROLES;
  $scope.id = 1;
  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };
}).controller('childController', function($scope) {
  $scope.ids = 2;
});


// .config(['$locationProvider', '$routeProvider',
//     function config($locationProvider, $routeProvider) {
//         $locationProvider.hashPrefix('!');

//         $routeProvider.
//         when('/login', {
//             template: '<login-form></login-form>'
//         }).
//         when('/phones', {
//             template: '<phone-list></phone-list>'
//         }).
//         when('/phones/:phoneId', {
//             template: '<phone-detail></phone-detail>'
//         }).
//         otherwise('/login');
//     }
// ])