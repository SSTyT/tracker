'use strict';
angular.module('tracker')
  .directive('trackerDropdown', [function() {
    return {
      restrict: 'E',
      templateUrl: 'dropdown/dropdown.html',
      scope: {
        'title': '@',
        'description': '@',
        'selected': '=',
        'list': '='
      },
      controller: 'trackerDropdownCtrl'
    }
  }])
  .controller('trackerDropdownCtrl', ['$scope', '$element', function function_name($scope, $element) {
    $element.addClass('tracker-dropdown')

    $scope.field = '';
    $scope.picked = false;

    $scope.pick = function(item) {
      $scope.picked = true;
      $scope.field = item.name;
      $scope.selected = item;
    };

    $scope.$watch('field', function() {
      if ($scope.selected && $scope.field !== $scope.selected.name) {
        $scope.picked = false;
        $scope.selected = undefined;
      }
    }, false);

  }]);
