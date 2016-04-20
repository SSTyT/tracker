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
    var ctrl = this;

    ctrl.resetState = function() {
      //recreo hitos
      $scope.milestones = [
        milestone.create('Ingresando', false),
        milestone.create('Detenido', true),
        milestone.create('Puertas abiertas', true),
        milestone.create('Sube último pasajero', true),
        milestone.create('Sale de estación', false),
      ];

      ctrl.state = {
        tracking: false,
        milestoneIndex: 0,
        finished: false
      }
      $scope.startTime = null;
    };


    $scope.station = $state.params.station;
    $scope.buttons = {
      start: function() {
        return !ctrl.state.tracking && !ctrl.state.finished;
      },
      register: function() {
        return ctrl.state.tracking;
      },
      skip: function() {
        return $scope.milestones[ctrl.state.milestoneIndex].skippable;
      },
      cancel: function() {
        return ctrl.state.finished;
      },
      next: function() {
        return ctrl.state.finished;
      },
      onStart: function() {
        $scope.milestones[0].active = true;
        ctrl.state.tracking = true;
        $scope.startTime = moment().toISOString();
      },
      onRegister: function() {
        $scope.milestones[ctrl.state.milestoneIndex].active = false;
        if ($scope.milestones.length - 1 == ctrl.state.milestoneIndex) {
          ctrl.state.finished = true;
          ctrl.state.tracking = false;
        } else {
          ctrl.state.milestoneIndex++;
          $scope.milestones[ctrl.state.milestoneIndex].active = true;
        }
      },
      onSkip: function() {
        $scope.milestones[ctrl.state.milestoneIndex].active = false;
        $scope.milestones[ctrl.state.milestoneIndex].skipped = true;
        if ($scope.milestones.length - 1 == ctrl.state.milestoneIndex) {
          ctrl.state.finished = true;
          ctrl.state.tracking = false;
        } else {
          ctrl.state.milestoneIndex++;
          $scope.milestones[ctrl.state.milestoneIndex].active = true;
        }
      },
      onCancel: function() {
        ctrl.resetState();
      },
      onNext: function() {
        //TODO state.go
      }
    }

    ctrl.resetState();

  }]);
