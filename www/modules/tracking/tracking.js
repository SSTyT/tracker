'use strict';
angular.module('tracker')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('tracking', {
      url: '/tracking',
      templateUrl: 'tracking/tracking.html',
      controller: 'TrackingCtrl',
      controllerAs: 'ctrl',
      params: {
        station: {},
        line: 0,
        user: ''
      }
    });

  }])
  .controller('TrackingCtrl', ['$scope', '$state', '$ionicPopup', '$ionicSideMenuDelegate', '$timeout', 'milestone', 'saveRegister',
    function($scope, $state, $ionicPopup, $ionicSideMenuDelegate, $timeout, milestone, saveRegister) {
      var ctrl = this;

      $scope.station = $state.params.station;
      $scope.line = $state.params.line;

      ctrl.trackingInstances = [];

      ctrl.createTrackingInstance = function() {
        return {
          active: true,
          created: moment().format('HH:mm:ss'),
          station: $state.params.station,
          line: $state.params.line,
          user: $state.params.user,
          milestones: [
            milestone.create('Ingresando', false),
            milestone.create('Detenido', true),
            milestone.create('Puertas abiertas', true),
            milestone.create('Sube último pasajero', true),
            milestone.create('Sale de estación', false),
          ],
          data: {},
          milestoneIndex: 0,
          finished: false
        };
      }

      ctrl.instanceDone = function() {
        var index = ctrl.trackingInstances.indexOf($scope.instance);

        //get new active instance
        if (ctrl.trackingInstances.length == 1) {
          $scope.instance = ctrl.createTrackingInstance();
          ctrl.trackingInstances.push($scope.instance);
        } else if (index == 0) {
          $scope.instance = ctrl.trackingInstances[index + 1];
          $scope.instance.active = true;
        } else {
          $scope.instance = ctrl.trackingInstances[index - 1];
          $scope.instance.active = true;
        }

        ctrl.trackingInstances.splice(index, 1);
      }

      $scope.instance = ctrl.createTrackingInstance();
      ctrl.trackingInstances.push($scope.instance);

      ctrl.nextMilestone = function() {
        if ($scope.instance.milestones.length - 1 == $scope.instance.milestoneIndex) {
          $scope.instance.finished = true;
        } else {
          $scope.instance.milestoneIndex++;
        }
      }

      $scope.buttons = {
        register: function() {
          return !$scope.instance.finished;
        },
        skip: function() {
          return !$scope.instance.finished && $scope.instance.milestones[$scope.instance.milestoneIndex].skippable;
        },
        cancel: function() {
          return $scope.instance.finished;
        },
        save: function() {
          return $scope.instance.finished;
        },
        onRegister: function() {
          $scope.instance.milestones[$scope.instance.milestoneIndex].completed = true;
          ctrl.nextMilestone();
        },
        onSkip: function() {
          $scope.instance.milestones[$scope.instance.milestoneIndex].completed = true;
          $scope.instance.milestones[$scope.instance.milestoneIndex].skipped = true;
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
              ctrl.instanceDone();
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
              saveRegister($scope.instance, function(saved) {
                if (saved) {
                  ctrl.instanceDone();
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

      $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

      $scope.addInstance = function() {
        $scope.instance.active = false;
        $scope.instance = ctrl.createTrackingInstance();
        ctrl.trackingInstances.push($scope.instance);
        $scope.toggleMenu();
      };

      $scope.swap = function(instance) {
        $scope.instance.active = false;
        instance.active = true;
        $scope.instance = instance;
        $scope.toggleMenu();
      }
    }
  ]);
