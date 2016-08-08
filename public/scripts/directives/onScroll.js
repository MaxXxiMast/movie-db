(function (angular) {
    'use strict';

    var app = angular.module('directives.onSroll', []);

    app.directive('onScroll', [function () {
        return {
            restrict: 'A',
            scope: '&',
            link: function (scope, element, attrs) {
                // we get a list of elements of size 1 and need the first element
                raw = element[0];

                // we load more elements when scrolled past a limit
                element.bind("scroll", function(){
                  if(raw.scrollTop+raw.offsetHeight+5 >= raw.scrollHeight){
                    scope.loading = true;

                  // we can give any function which loads more elements into the list
                    scope.$apply(attrs.onScroll);
                  }
                });
            }
        };
    }]);

})(angular);
