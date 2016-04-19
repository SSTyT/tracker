'use strict';
angular.module('tracker')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('list', {
      url: '/landing',
      templateUrl: 'landing/landing.html'
    });

  }]);
