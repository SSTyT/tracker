'use strict';
angular.module('tracker')
  .factory('fileStorage', ['$cordovaFile', function fileStorageFactory($cordovaFile) {
    var fileStorage = {}

    var today = moment().format('YYYY-MM-DD');
    var fileName = 'relevamientos-' + today + '.csv'
    var header =
      'Relevador;' +
      'Fecha;' +
      'Parador;' +
      'Linea;' +
      'Ingresa;' +
      'Se detiene paralelo al cordón;' +
      'Sube/baja  el primer pasajero;' +
      'Sube/baja el último pasajero;' +
      'Egresa;' +
      '¿Cuántos subieron?;' +
      '¿Cuántos bajaron?;' +
      'Sentido;' +
      'Ingreso por carril de operacion;' +
      'Se detuvo en el semaforo;' +
      'Colectivo articulado;' +
      'Ascensos por puerta del medio;' +
      'Operacion fuera de parador;' +
      'Demorado por inspector;' +
      'Observaciones';

    function toCSV(instance) {
      var today = moment().format('DD-MM-YYYY');
      var line = '';

      line += instance.user + ';';
      line += today + ';';
      line += instance.station.name + ';';
      line += instance.data.line + ';';

      angular.forEach(instance.milestones, function(milestone) {
        if (milestone.skipped) {
          line += ';';
        } else {
          line += milestone.date + ';';
        }
      });

      line += (instance.data.ascended || '0') + ';';
      line += (instance.data.descended || '0') + ';';
      line += (instance.data.direction || '') + ';';
      line += (instance.data.opLane ? 'si' : 'no') + ';';
      line += (instance.data.redLight ? 'si' : 'no') + ';';
      line += (instance.data.articulado ? 'si' : 'no') + ';';
      line += (instance.data.middleAscension ? 'si' : 'no') + ';';
      line += (instance.data.outOfBounds ? 'si' : 'no') + ';';
      line += (instance.data.inspector ? 'si' : 'no') + ';';
      line += (instance.data.comment || '');

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

      fileStorage.write = function(instance, cb) {
        var data = toCSV(instance);

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
