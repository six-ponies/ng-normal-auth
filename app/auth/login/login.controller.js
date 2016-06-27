'use strict';

// 登录页面控制器
angular.module('ng-normal-auth').controller('loginController', function($scope, $rootScope, authService, $state, AUTH_EVENTS) {
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = function(credentials) {
        authService.login(credentials).then(function(user) {
            if (user) {
                $scope.setCurrentUser(user);
                // 返回到认证之前的用户想要去的页面
                $state.go(authService.nextStateName);
            }
        });
    };
});