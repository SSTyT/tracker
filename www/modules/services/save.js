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
      line += (formData.comment.replace(/\n/gi) || '') + '\n';

      return line;
    }

    return function(station, milestones, formData) {
      var data = toCSV(station, milestones, formData);
      fileStorage.write(data);
    }
  }])
