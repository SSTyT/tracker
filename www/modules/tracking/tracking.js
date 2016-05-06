'use strict';
angular.module('tracker')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('tracking', {
      url: '/tracking',
      templateUrl: 'tracking/tracking.html',
      controller: 'TrackingCtrl',
      params: {
        station: {},
        line: 0,
        user: ''
      }
    });

  }])
  .controller('TrackingCtrl', ['$scope', '$state', '$ionicPopup', '$timeout', 'milestone', 'saveRegister',
    function($scope, $state, $ionicPopup, $timeout, milestone, saveRegister) {
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

      $scope.params = {};
      $scope.params.station = $state.params.station;
      $scope.params.line = $state.params.line;
      $scope.params.user = $state.params.user;

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
          var confirm = $ionicPopup.confirm({
            title: 'Cancelar',
            cssClass: 'align-center',
            template: '<span>Se perderan los datos cargados</span>',
            cancelText: 'Cancelar',
            cancelType: 'button-assertive',
            okType: 'button-balanced'
          });

          confirm.then(function(cancel) {
            if (cancel) {
              ctrl.resetState();
            }
          });
        },
        onSave: function() {
          var confirm = $ionicPopup.confirm({
            title: 'Guardar datos?',
            cssClass: 'align-center',
            cancelText: 'Cancelar',
            cancelType: 'button-assertive',
            okText: 'Guardar',
            okType: 'button-balanced'
          });

          confirm.then(function(save) {
            if (save) {
              saveRegister($scope.params, $scope.milestones, $scope.data, function(saved) {
                if (saved) {
                  ctrl.resetState();
                  $scope.message = 'Registro grabado';
                } else {
                  $scope.message = 'Error, intente nuevamente';
                }

                $scope.saved = saved
                $scope.showMessage = true;

                $timeout(function() {
                  $scope.showMessage = false;
                }, 1500)
              });
            }
          });
        }
      }

      ctrl.resetState();

    }
  ]);
