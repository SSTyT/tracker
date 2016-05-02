'use strict';
angular.module('tracker')
  .factory('fileStorage', ['$cordovaFile', function fileStorageFactory($cordovaFile) {
    var fileStorage = {}

    var today = moment().format('YYYY-MM-DD');
    var fileName = 'relevamientos-' + today + '.csv'
    var header = 'Parador;' +
      'Ingresando;' +
      'Detenido;' +
      'Puertas abiertas;' +
      'Sube ultimo pasajero;' +
      'Sale de estacion;' +
      'Linea;' +
      'Pasajeros Ascendidos;' +
      'Pasajeros Descendidos;' +
      'Ingreso por carril de operacion' +
      'Se detuvo en el semaforo' +
      'Colectivo articulado' +
      'Ascensos por puerta del medio' +
      'Operacion fuera de parador' +
      'Otras observaciones';

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

      line += (formData.line || '') + ';';
      line += (formData.ascended || '0') + ';';
      line += (formData.descended || '0') + ';';
      line += (formData.opLane?'si':'no') + ';';
      line += (formData.redLight?'si':'no') + ';';
      line += (formData.articulado?'si':'no') + ';';
      line += (formData.middleAscension?'si':'no') + ';';
      line += (formData.outOfBounds?'si':'no') + ';';
      line += (formData.comment || '');

      return line;
    }

    document.addEventListener('deviceready', function() {
      $cordovaFile.createFile(cordova.file.externalRootDirectory, fileName, false)
        .then(function(success) {
          //write header
          $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory, fileName, header)
        }, function(error) {
          //File already exists
        });

      fileStorage.write = function(station, milestones, formData, cb) {
        var data = toCSV(station.name, milestones, formData);
        $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory, fileName, '\n' + data)
          .then(function(success) {
            cb(true);
          }, function(error) {
            cb(false);
          });
      }
    });

    return fileStorage;
  }])
