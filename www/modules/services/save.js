'use strict';
angular.module('tracker')
  .factory('saveRegister', ['fileStorage', function saveService(fileStorage) {

    return function(params, milestones, formData, cb) {
      if (fileStorage.write) {
        fileStorage.write(params, milestones, formData, cb);
      } else {
        cb(false);
      }
    }
  }])
