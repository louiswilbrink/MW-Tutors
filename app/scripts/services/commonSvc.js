'use strict';

angular.module('MWTutorsApp')
  .factory('commonSvc', function () {

  return {
    
    objectToArray: function (object) {

      var array = [];

      angular.forEach(object, function (value) {
        array.push(value);
      });

      return array;
    }
  }
});
