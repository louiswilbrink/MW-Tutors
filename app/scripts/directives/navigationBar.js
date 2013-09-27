'use strict';

angular.module('MWTutorsApp')
  .directive('navigationBar', function () {
    return {
      templateUrl: 'views/navigationBar.html',
      restrict: 'E',
      controller: function ($scope, $location, $anchorScroll) {

        $scope.gotoNewsfeed = function () {
          $location.path("/newsfeed");
        };

        $scope.gotoAboutUs = function () {

          if ($location.path() == '/')
          {
            $location.hash('about-us');
            $anchorScroll();
          }
          else
          {
            $location.path('/about-us');
          }
        };

        $scope.gotoContactUs = function () {

          $location.path('/contact-us');
        };

        $scope.gotoCalendar = function () {

          $location.path('/calendar');
        }
      }
    };
  });
