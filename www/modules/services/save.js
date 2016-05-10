'use strict';
angular.module('tracker')
  .factory('saveRegister', ['fileStorage', function saveService(fileStorage) {

    return function(instance, cb) {
      if (fileStorage.write) {
        fileStorage.write(instance, cb);
      } else {
        cb(false);
      }
    }
  }])
