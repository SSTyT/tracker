'use strict';
angular.module('tracker')
  .factory('fileStorage', ['$cordovaFile', function fileStorageFactory($cordovaFile) {
    var fileStorage = {}

    var today = moment().format('YYYY-MM-DD');
    var fileName = 'relevamientos-' + today + '.csv'

    document.addEventListener('deviceready', function() {
      $cordovaFile.createFile(cordova.file.externalRootDirectory, fileName, false)
        .then(function(success) {
          console.log(success);
        }, function(error) {
          console.log(error);
        });

      fileStorage.write = function(data) {
        $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory, fileName, data)
          .then(function(success) {
            console.log(success);
          }, function(error) {
            console.log(error);
          });
      }
    });

    return fileStorage;
  }])
