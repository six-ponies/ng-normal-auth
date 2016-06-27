'use strict';

// 定义authInterceptor拦截器
angular.module('ng-normal-auth').factory('authInterceptor', function(AUTH_EVENTS, $rootScope, $q) {
    return {
        responseError: function(res) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout
            }[res.status], res);
            return $q.reject(res);
        }
    }
});