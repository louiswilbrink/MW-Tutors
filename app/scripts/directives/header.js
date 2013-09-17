'use strict';

angular.module('micaApp')
  .directive('header', function () {
    return {
      templateUrl: 'views/header.html',
      restrict: 'E',
    };
  });
