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
      'Ingresando;' +
      'Detenido;' +
      'Puertas abiertas;' +
      'Sube ultimo pasajero;' +
      'Sale de estacion;' +
      'Pasajeros Ascendidos;' +
      'Pasajeros Descendidos;' +
      'Ingreso por carril de operacion;' +
      'Se detuvo en el semaforo;' +
      'Colectivo articulado;' +
      'Ascensos por puerta del medio;' +
      'Operacion fuera de parador;' +
      'Demorado por inspector;' +
      'Otras observaciones';

    function toCSV(params, milestones, formData) {
      var today = moment().format('DD-MM-YYYY');
      var line = '';

      line += params.user + ';';
      line += today + ';';
      line += params.station.name + ';';
      line += params.line + ';';

      angular.forEach(milestones, function(milestone) {
        if (milestone.skipped) {
          line += ';';
        } else {
          line += milestone.date.format('HH:mm:ss') + ';';
        }
      });

      line += (formData.ascended || '0') + ';';
      line += (formData.descended || '0') + ';';
      line += (formData.opLane ? 'si' : 'no') + ';';
      line += (formData.redLight ? 'si' : 'no') + ';';
      line += (formData.articulado ? 'si' : 'no') + ';';
      line += (formData.middleAscension ? 'si' : 'no') + ';';
      line += (formData.outOfBounds ? 'si' : 'no') + ';';
      line += (formData.inspector ? 'si' : 'no') + ';';
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

      fileStorage.write = function(params, milestones, formData, cb) {
        var data = toCSV(params, milestones, formData);
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
