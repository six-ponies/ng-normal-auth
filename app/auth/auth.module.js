'use strict';

// ng-normal-auth module
angular.module('ng-normal-auth', []).
run(function($rootScope, AUTH_EVENTS, authService, Session, $window) {

    // 从session中获取用户数据，避免意外刷新后，Session中的数据被清空
    if ($window.sessionStorage.getItem('userId')) {
        Session.userId = $window.sessionStorage.getItem('userId');
        Session.userRole = $window.sessionStorage.getItem('userRole');
    }

    // 监听路由变换事件。每次变换都需要重新校验用户权限
    $rootScope.$on('$stateChangeStart', function(event, next) {
        var authorizedRoles = next.data.authorizedRoles;

        // 判断用户是否具有该路由权限，如果没有则停止跳转，并触发未授权或未登录事件
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