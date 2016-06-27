'usr strict';

angular.module('ng-normal-auth').directive('loginForm', function(AUTH_EVENTS, authService) {
    return {
        restrict: 'A',
        controller: 'loginController',
        template: '<div ng-if="visible" ng-include="\'' + authService.configs.loginFormUrl + '\'">',

        link: function(scope) {
            var showDialog = function() {
                scope.visible = true;
            };
            var hideDialog = function() {
                scope.visible = false;
            }
            scope.visible = false;
            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
            scope.$on(AUTH_EVENTS.notAuthorized, showDialog);
            scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);
        }
    };
})