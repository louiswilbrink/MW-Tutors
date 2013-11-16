'use strict';

angular.module('MWTutorsApp')
  .filter('limitTitleCharacters', function () {
    return function (input) {
      var output = input;

      //output = output.length;
      return output;
    };
  });
