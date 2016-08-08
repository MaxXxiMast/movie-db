(function (angular) {
    'use strict';

    angular
        .module('services.Main', [])
        .service('mainService', MainService);

    MainService.$inject = ['$http', '$q'];

    function MainService ($http, $q) {

        this.getData = function (page, endPoint) {
            var url = apiUrl + endPoint;
            if (page > 0) {
                url += '&page=' + page;
            }
            return $http.get(url);
        };
    }
})(angular);
