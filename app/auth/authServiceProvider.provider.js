'use strict';

// 定义authServiceProvider 以及 authService
angular.module('ng-normal-auth').provider('authService', function() {
    var defaults = {
        submitLoginUrl: 'dataBase/user.json',
        loginFormUrl: 'auth/login/loginForm.html',
    };

    this.configure = function(options) {
        // 扩展defaults
        angular.extend(defaults, options);
    };

    // 实现Provider的$get方法
    this.$get = ['$http', 'AUTH_EVENTS', '$rootScope', 'Session', '$window', function($http, AUTH_EVENTS, $rootScope, Session, $window) {
        return {
            configs: defaults,
            nextStateName: '', // 记录认证之前的state状态，方便认证成功后跳转

            // 登录认证方法
            login: function(params, url) {
                url = url || this.configs.submitLoginUrl;

                // 这里用$http.get()方法获取data.json里面的所有用户数据
                // 是一种便于没有数据库时候的调试，实际项目中会将数据post
                // 到server端，然后在server端进行校验 
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
                }, function(err) {
                    console.log(err);
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed, err);
                });

                // 一下代码更像实际中使用的代码
                // $http.post(url, params).then(function(res) {
                //     Session.create(res.data.id, res.data.userRole);
                //     $window.sessionStorage.setItem('userId', Session.userId);
                //     $window.sessionStorage.setItem('userRole', Session.userRole);
                //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, res);
                // }, function(err) {
                //     console.log(err);
                //     $rootScope.$broadcast(AUTH_EVENTS.loginFailed, err);
                // })
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
});