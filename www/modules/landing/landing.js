'use strict';
angular.module('tracker')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('list', {
      url: '/landing',
      templateUrl: 'landing/landing.html',
      controller: 'LandingCtrl'
    });

  }])
  .controller('LandingCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.station = '';
    $scope.track = function(station) {
      $state.go('tracking', { station: station });
    };
  }]);
