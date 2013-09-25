'use strict';

angular.module('MWTutorsApp')
  .directive('aboutUs', function () {
    return {
      templateUrl: 'views/aboutUs.html',
      restrict: 'E',
      controller: function ($scope) {
      }
    };
  });
