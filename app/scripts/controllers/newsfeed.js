'use strict';

angular.module('MWTutorsApp')
  .controller('NewsfeedCtrl', ['$scope', 'feedSvc', function ($scope, feedSvc) {

    // *** MODEL *** //

    $scope.newsfeed = [];

    // *** INITIALIZATION *** //

    feedSvc.initialize();

    // *** USER-ACTIONS *** //

    // *** EVENT-HANDLERS *** //

    $scope.$on("Newsfeed Built", function () {
      $scope.newsfeed = feedSvc.getNewsfeed();
    });
  }]);
