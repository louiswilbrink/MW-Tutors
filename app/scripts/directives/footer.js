'use strict';

angular.module('MWTutorsApp')
  .directive('footer', function () {
    return {
      templateUrl: 'views/footer.html',
      restrict: 'E',
      controller: function ($scope) {

      }
    };
  });
