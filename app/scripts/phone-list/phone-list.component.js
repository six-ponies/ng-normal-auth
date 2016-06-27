'use strict';

angular.
module('phoneList').
component('phoneList', {
    templateUrl: 'scripts/phone-list/phone-list.template.html',
    controller: function PhoneListController($http) {
        // this.phones = [{
        //     name: 'Nexus S',
        //     snippet: 'Fast just got faster with Nexus S.',
        //     age: 1
        // }, {
        //     name: 'Motorola XOOM™ with Wi-Fi',
        //     snippet: 'The Next, Next Generation tablet.',
        //     age: 2
        // }, {
        //     name: 'MOTOROLA XOOM™',
        //     snippet: 'The Next, Next Generation tablet.',
        //     age: 3
        // }];
        var self = this;
        self.orderProp = 'age';

        $http.get('phones/phones.json').then(function(response) {
            self.phones = response.data;
        });
    }
});