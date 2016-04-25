'use strict';
angular.module('tracker')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('tracking', {
      url: '/tracking/:station',
      templateUrl: 'tracking/tracking.html',
      controller: 'TrackingCtrl'
    });

  }])
  .controller('TrackingCtrl', ['$scope', '$state', 'milestone', 'saveRegister',
    function($scope, $state, milestone, saveRegister) {
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
          milestoneIndex: 0,
          finished: false
        }

        $scope.data = {};
      };

      ctrl.nextMilestone = function() {
        if ($scope.milestones.length - 1 == ctrl.state.milestoneIndex) {
          ctrl.state.finished = true;
        } else {
          ctrl.state.milestoneIndex++;
        }
      }

      $scope.station = $state.params.station;
      $scope.buttons = {
        register: function() {
          return !ctrl.state.finished;
        },
        skip: function() {
          return !ctrl.state.finished && $scope.milestones[ctrl.state.milestoneIndex].skippable;
        },
        cancel: function() {
          return ctrl.state.finished;
        },
        save: function() {
          return ctrl.state.finished;
        },
        onRegister: function() {
          $scope.milestones[ctrl.state.milestoneIndex].completed = true;
          ctrl.nextMilestone();
        },
        onSkip: function() {
          $scope.milestones[ctrl.state.milestoneIndex].completed = true;
          $scope.milestones[ctrl.state.milestoneIndex].skipped = true;
          ctrl.nextMilestone();
        },
        onCancel: function() {
          ctrl.resetState();
        },
        onSave: function() {
          saveRegister($scope.station, $scope.milestones, $scope.data);
        }
      }

      ctrl.resetState();

    }
  ]);
