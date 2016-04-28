'use strict';
angular.module('tracker')
  .factory('saveRegister', ['fileStorage', function saveService(fileStorage) {
    function toCSV(station, milestones, formData) {
      var line = '';
      line += station + ';';

      angular.forEach(milestones, function(milestone) {
        if (milestone.skipped) {
          line += ';';
        } else {
          line += milestone.date.format('DD/MM/YYYY-HH:mm:ss') + ';';
        }
      });

      line += (formData.descended || '') + ';';
      line += (formData.ascended || '') + ';';
      line += (formData.line || '') + ';';
      line += (formData.comment || '');

      return line;
    }

    return function(station, milestones, formData, cb) {
      var data = toCSV(station.name, milestones, formData);
      console.log(data);
      if (fileStorage.write) {
        fileStorage.write(data, cb);
      } else {
        cb(false);
      }
    }
  }])
