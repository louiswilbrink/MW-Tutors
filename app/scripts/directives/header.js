'use strict';

angular.module('MWTutorsApp')
  .directive('header', function () {
    return {
      templateUrl: 'views/header.html',
      restrict: 'E',
    };
  });
