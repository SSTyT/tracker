'use strict';
angular.module('tracker')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('trackings', {
      url: '/trackings',
      templateUrl: 'trackings/trackings.html',
      controller: 'TrackingsCtrl',
      params: {
        station: {},
        line: 0,
        user: ''
      }
    });

  }])
  .controller('TrackingsCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.params = {};
    $scope.params.station = $state.params.station;
    $scope.params.line = $state.params.line;
    $scope.params.user = $state.params.user;

      $state.go('trackings.instance', $scope.params);
  }]);
