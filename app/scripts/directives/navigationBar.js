'use strict';

angular.module('micaApp')
  .directive('navigationBar', function () {
    return {
      templateUrl: 'views/navigationBar.html',
      restrict: 'E',
      controller: function ($scope) {

      }
    };
  });
