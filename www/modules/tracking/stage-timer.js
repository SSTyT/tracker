'use strict';
angular.module('tracker')
  .directive('stageTimer', [function() {
    return {
      restrict: 'E',
      templateUrl: 'tracking/stage-timer.html',
      scope: {
        'stage': '=',
        'startTime': '='
      },
      controller: 'stageTimerCtrl'
    }
  }])
  .controller('stageTimerCtrl', ['$scope', '$element', function function_name($scope, $element) {
    var ctrl = this;

    ctrl.running = false;
    ctrl.initialized = false;
    ctrl.timer = $element.find('timer')[0];

    ctrl.start = function() {
      if (ctrl.initialized) {
        ctrl.timer.resume();
      } else {
        ctrl.timer.start();
        ctrl.initialized = true;
      }
      ctrl.running = true;
    };

    ctrl.stop = function() {
      ctrl.timer.stop();
      ctrl.running = false;
    };

    $scope.showTimer = false;

    $scope.$watch('stage.active', function() {
      if ($scope.stage.active) {
        ctrl.start();
        $scope.showTimer = true;
      } else {
        ctrl.stop();
      }
    }, false);

    $scope.$watch('stage.skipped', function() {
      if ($scope.stage.skipped) {
        $scope.showTimer = false;
      }
    }, false);
  }]);
