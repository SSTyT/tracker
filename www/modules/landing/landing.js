'use strict';
angular.module('tracker')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('list', {
      url: '/landing',
      templateUrl: 'landing/landing.html',
      controller: 'LandingCtrl'
    });

  }])
  .controller('LandingCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
    $scope.data = {
      station: '',
      stations: []
    }

    $http.get('modules/landing/metrobus.json').then(function(metrobus) {
      metrobus.data.forEach(function(station) {
        $scope.data.stations.push(station);
      })
    })

    $scope.track = function(station) {
      $state.go('tracking', { station: station });
    };

  }]);
