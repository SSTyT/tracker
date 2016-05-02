'use strict';
angular.module('tracker')
  .directive('milestoneRegistry', [function() {
    return {
      restrict: 'E',
      templateUrl: 'tracking/milestone-registry.html',
      scope: {
        'milestone': '='
      },
      controller: 'milestoneRegistryCtrl'
    }
  }])
  .controller('milestoneRegistryCtrl', ['$scope', function function_name($scope) {

    $scope.swipe = function() {
      if ($scope.milestone.completed && $scope.milestone.skippable) {
        $scope.milestone.skipped = true;
        $scope.milestone.date = null;
        $scope.date = '-';
      }
    }

    $scope.$watch('milestone.completed', function() {
      if ($scope.milestone.completed) {
        $scope.milestone.date = moment();
        $scope.date = $scope.milestone.skipped ? '-' : $scope.milestone.date.format('DD/MM/YYYY - HH:mm:ss');
      }
    }, false);
  }]);
