'use strict';

angular.module('MWTutorsApp')
  .directive('navigationBar', function () {
    return {
      templateUrl: 'views/navigationBar.html',
      restrict: 'E',
      controller: function ($scope, $location, $anchorScroll) {

        $scope.gotoAboutUs = function () {
          $location.hash('about-us');

          $anchorScroll();
        };
      }
    };
  });
