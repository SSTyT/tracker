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
    $scope.$watch('milestone.completed', function() {
      if ($scope.milestone.completed) {
        $scope.milestone.date = moment();
        $scope.date = $scope.milestone.skipped ? '-' : $scope.milestone.date.format('DD/MM/YYYY - HH:mm:ss');
      }
    }, false);
  }]);
