'use strict';
angular.module('tracker')
  .config(function($stateProvider) {

    $stateProvider.state('list', {
      url: '/landing',
      templateUrl: 'landing/landing.html'
    });

  });
