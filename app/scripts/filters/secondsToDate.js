'use strict';

angular.module('MWTutorsApp')
  .filter('secondsToDate', function () {
    return function (input) {

      var date = new Date(); 
      date.setTime(input * 1000);

      return date.toLocaleString();
    };
  });
