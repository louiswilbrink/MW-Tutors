'use strict';

angular.module('MWTutorsApp')
  .directive('aboutUs', function () {
    return {
      templateUrl: 'views/aboutUs.html',
      restrict: 'E',
      controller: function ($scope, $location) {

        $scope.gotoNewsfeed = function () {
          $location.path("/newsfeed");
        };

        $scope.gotoCalendar = function () {

          $location.path('/calendar');
        }
      }
    };
  });
