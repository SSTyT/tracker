'use strict';
angular.module('tracker')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('tracking', {
      url: '/tracking/:station',
      templateUrl: 'tracking/tracking.html',
      controller: 'TrackingCtrl'
    });

  }])
  .controller('TrackingCtrl', ['$scope', '$state', 'milestone', function($scope, $state, milestone) {
    $scope.station = $state.params.station;

    $scope.milestones = [
      milestone.create('Ingresando', false),
      milestone.create('Detenido', true),
      milestone.create('Puertas abiertas', true),
      milestone.create('Sube último pasajero', true),
      milestone.create('Sale de estación', false),
    ];
  }]);
