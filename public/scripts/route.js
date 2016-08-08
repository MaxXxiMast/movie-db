(function (angular) {
    'use strict';

    angular
        .module('mainRouter', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            // $locationProvider.html5Mode(true);
            $routeProvider.
                when('/', {
                    templateUrl: domainName + 'partials/mainView.html',
                    controller: 'MainCtrl',
                    controllerAs: 'kr'
                }).
                when('/details/:imdbID', {
                    templateUrl: domainName + 'partials/detailsView.html',
                    controller: 'MainCtrl',
                    controllerAs: 'kr'
                }).
                otherwise( { redirectTo: "/" });
            }
        ]);
})(angular);
