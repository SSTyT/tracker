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

        station.description = station.metrobus;
        station.description += station.linesNorth.length === 0 ? ' (Sur)' : '';
        station.description += station.linesSouth.length === 0 ? ' (Norte)' : '';

        $scope.data.stations.push(station);
      })
    })

    $scope.track = function(data) {
      $state.go('tracking', data);
    };

    $scope.trackDisabled = function(data) {
      return !data.station || !data.user || !data.direction;
    };

  }]);
