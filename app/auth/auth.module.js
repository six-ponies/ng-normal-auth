'use strict';

angular.module('ng-normal-auth', []).
run(function($rootScope, AUTH_EVENTS, authService, Session, $window) {
    if ($window.sessionStorage.getItem('userId')) {
        Session.userId = $window.sessionStorage.getItem('userId');
        Session.userRole = $window.sessionStorage.getItem('userRole');
        console.log(Session.userRole);
    }
    $rootScope.$on('$stateChangeStart', function(event, next) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!authService.isAuthorized(authorizedRoles)) {
            authService.nextStateName = next.name;
            event.preventDefault();
            if (authService.isAuthenticated()) {
                console.log('not authorized!');
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                console.log('not authenticated!');
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }
    });
});