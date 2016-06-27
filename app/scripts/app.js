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

// 添加一个父控制器，用于保存用户信息，并可以根据该用户权限决定页面上显示的内容 
angular.module('phonecatApp').controller('AppParentController', function($scope, USER_ROLES) {
  $scope.currentUser = null;
  $scope.USER_ROLES = USER_ROLES;
  $scope.id = 1;
  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };
});