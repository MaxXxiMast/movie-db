(function (angular) {
    'use strict';

    var app = angular.module('directives.lazyScroll', []);

    app.directive('lazyScroll', ['$rootScope', '$window', function($rootScope, $window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var loadData, flag = 1;
                $window = angular.element($window);

                loadData = function() {
                    var wintop = window.pageYOffset;
                    var docHeight = window.document.body.clientHeight;
                    var windowHeight = window.innerHeight;
                    var triggered = (wintop/(docHeight - windowHeight));
                    // if (flag === 1){
                        flag = 0;
                        if((triggered >= 1) ){
                             return scope.$apply(attrs.lazyScroll);
                        }
                    // }

                };

                $window.on('scroll', loadData);
                scope.$on('$destroy', function() {
                  return $window.off('scroll', loadData);
                });
              }
        };
    }]);

})(angular);
