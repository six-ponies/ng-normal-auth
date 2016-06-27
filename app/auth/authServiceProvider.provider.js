'use strict';

angular.module('ng-normal-auth').provider('authService', function() {
    var defaults = {
        version: '',
        submitLoginUrl: 'dataBase/user.json',
        loginFormUrl: 'auth/login/loginForm.html',
    };

    this.configure = function(options) {
        angular.extend(defaults, options);
    };

    this.$get = ['$http', 'AUTH_EVENTS', '$rootScope', 'Session', '$window', function($http, AUTH_EVENTS, $rootScope, Session, $window) {
        return {
            configs: defaults,
            nextStateName: '',
            login: function(params, url) {
                url = url || this.configs.submitLoginUrl;
                return $http.get(url).then(function(res) {
                    var i = 0,
                        flag = false,
                        value;
                    for (; i < res.data.length; i++) {
                        value = res.data[i];
                        if (value.username === params.username && value.password === params.password) {
                            console.log('Login success!');
                            Session.create(value.id, value.userRole);
                            $window.sessionStorage.setItem('userId', Session.userId);
                            $window.sessionStorage.setItem('userRole', Session.userRole);
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, res);
                            flag = true;
                            break;
                        }
                    }
                    if (i == res.data.length) {
                        console.log('Login failed!')
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed, res);
                    }
                    return flag && value;
                });
            },
            isAuthenticated: function() {
                return !!Session.userId;
            },
            isAuthorized: function(authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return this.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1;
            }
        }
    }];
}).config(['authServiceProvider', function(authServiceProvider) {
    authServiceProvider.configure({
        version: '0.0.1',
        submitLoginUrl: 'dataBase/user.json'

    });
}]).controller('authTestController', function(authService, $scope) {
    $scope.version = authService.configs.version;
});