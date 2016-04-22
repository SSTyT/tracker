'use strict';
angular.module('tracker')
  .factory('fileStorage', [function fileStorageFactory() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

    function errorHandler(e) {
      console.log('Error: ' + e.name + ': ' + e.message);
    }

    function onInitFs(fs) {

      fs.root.getFile('log.txt', { create: true, exclusive: false }, function(fileEntry) {
      	console.log(fileEntry);
      }, errorHandler);

    }

    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFs, errorHandler);

    return {};
  }]);
