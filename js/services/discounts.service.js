(function () {
    'use strict';
    var discountsDAO = function (resource) {
        var api = resource('http://demotrt.com:8080/NextInsurance/discounts/:action/:subaction/:id', null, {
            update: {
                method: 'PUT'
            },
        });
        return {
            query: function (filter) {
                return api.query(filter).$promise;
            },
            get: function (params) {
                return api.get(params).$promise;
            },
            save: function (data) {
                return api.save(data).$promise;
            },
            update: function (data) {
                return api.update({id: data.id}, data).$promise;
            },
            delete: function (params) {
                return api.delete(params).$promise;
            }

        };
    };
    angular.module("insurance.service").factory('DiscountsDAO', ['$resource', discountsDAO]);
})();
