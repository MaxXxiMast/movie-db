(function (angular) {
    'use strict';

    var app = angular.module('kr-app', [
        'mainRouter',
        'angular-loading-bar',
        'services.Main',
        'controllers.Main',
        'directives.lazyScroll',
        'ngSanitize'
    ])
    .config(['$sceProvider', function($sceProvider) {
      $sceProvider.enabled(false);
    }]);

})(angular);
