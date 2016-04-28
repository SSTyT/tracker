'use strict';
angular.module('tracker')
  .factory('saveRegister', ['fileStorage', function saveService(fileStorage) {

    return function(station, milestones, formData, cb) {
      if (fileStorage.write) {
        fileStorage.write(station, milestones, formData, cb);
      } else {
        cb(false);
      }
    }
  }])
