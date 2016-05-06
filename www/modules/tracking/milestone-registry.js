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
    var ctrl = this;

    $scope.toggle = function() {
      if ($scope.milestone.completed && $scope.milestone.skippable) {
        $scope.milestone.skipped = !$scope.milestone.skipped;
        ctrl.updateDate();
      }
    }

    $scope.$watch('milestone.completed', function() {
      if ($scope.milestone.completed) {
        $scope.milestone.date = moment();
        ctrl.updateDate();
      }
    }, false);

    ctrl.updateDate = function() {
      $scope.date = $scope.milestone.skipped ? '-' : $scope.milestone.date.format('HH:mm:ss');
    }
  }]);
