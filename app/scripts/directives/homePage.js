'use strict';

angular.module('MWTutorsApp')
  .directive('homePage', function () {
    return {
      templateUrl: 'views/homePage.html',
      restrict: 'E',
      controller: function ($scope, $location, $anchorScroll) {

        $scope.gotoAboutUs = function () {
          $location.hash('about-us');

          $anchorScroll();
        };
      }
    };
  });
