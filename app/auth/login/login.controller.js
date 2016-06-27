'use strict';

angular.module('ng-normal-auth').controller('loginController', function($scope, $rootScope, authService, $state, AUTH_EVENTS) {
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = function(credentials) {
        authService.login(credentials).then(function(user) {
            if (user) {
                $scope.setCurrentUser(user);
                $state.go(authService.nextStateName);
            }

        });
    };
});