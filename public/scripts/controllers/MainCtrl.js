(function (angular) {
    'use strict';

    angular
        .module('controllers.Main', [])
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$routeParams', 'mainService'];

    function MainCtrl ($routeParams, mainService) {
        var kr = this;
        kr.data = {
            perPage: 10,
            currentPage: 1,
            nextPage: 2,
            endPoint: '?s=bad',
            detailEndpoint: '?i=' + $routeParams.imdbID,
            name: 'movie-db'
        };

        kr.isLoading = false;
        kr.reachLast = false;
        kr.getMore = getMore;
        kr.loadMore = loadMore;
        kr.test = test;

        if ($routeParams.imdbID) {
            getDetails($routeParams.imdbID);
            console.log('asd')
        } else {
            getMore(kr.data.currentPage, kr.data.endPoint);
        }

        function test () {
            console.log('scrolled');
        }

        function getDetails (id) {
            kr.isLoading = true;
            var data = kr.data || {};
            var endPoint = '?i=' + id;
            mainService.getData(0, endPoint)
                .success(function (res) {
                    data.selectedItem = res;
                    console.log(data)
                })
                .error( function(res) {
                    console.log('Error trying to fetch details', res);
                });
        }

        calculateTotalPages();

        function calculateTotalPages (key, value) {
            mainService.getData(0, kr.data.endPoint)
              .success(function (res) {
                  var data = kr.data || {};
                  data.totalPages = Math.ceil(res.totalResults / data.perPage);
                  if (data.totalPages === 0) {
                      data.currentPage = 0;
                  }
              })
              .error(function (res) {
                  console.log('Error trying to get the total number of pages', res);
              });
        }

        function getMore (pageNumber, endPoint) {
            kr.isLoading = true;
            var data = kr.data || {};
            data.items = [];
            if (! endPoint) {
                endPoint = data.endPoint;
            }
            mainService.getData(pageNumber, endPoint)
              .success(function (res) {
                  (res.Search).map(function(obj) {
                      data.items.push(obj);
                  });
                  kr.isLoading = false;
              })
              .error(function (res) {
                  console.log('Error fetching more Content', res);
              });
        }

        function loadMore () {
            kr.isLoading = true;
            var fired = 0;
            if (kr.reachLast) {
                return false;
            }
            var data = kr.data || {};
            mainService.getData(data.nextPage, data.endPoint)
              .success(function (res) {
                  (res.Search).map(function(obj) {
                      data.items.push(obj);
                  });

                  data.nextPage++;
                  if(data.nextPage >= data.totalPages) {
                     kr.reachLast = true;
                  }
                //   console.log(data.nextPage);
                  fired = 1;
                  kr.isLoading = false;
              })
              .error(function (res) {
                  console.log('Error fetching more Content', res);
              });
        }
    }
})(angular);
