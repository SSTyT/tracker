'use strict';
angular.module('tracker')
  .directive('stageTimer', [function() {
    return {
      restrict: 'E',
      templateUrl: 'stage-timer/stage-timer.html',
      scope: {
        'title': '@'
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


    $scope.tap = function() {
      ctrl.running ? ctrl.stop() : ctrl.start();
    }
  }]);

//centisecond
//Math.floor((millis % 1000) / 10);
