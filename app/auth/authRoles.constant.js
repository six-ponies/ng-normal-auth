'use strict';

// 定义角色常量
angular.module('ng-normal-auth').constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
});