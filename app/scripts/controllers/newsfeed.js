'use strict';

angular.module('MWTutorsApp')
  .controller('NewsfeedCtrl', ['$scope', 'feedSvc', function ($scope, feedSvc) {

    // *** MODEL *** //

    $scope.newsfeed = [];
    $scope.feedUrls = [];

    // *** INITIALIZATION *** //

    // *** USER-ACTIONS *** //

    // *** EVENT-HANDLERS *** //

    $scope.$on("Newsfeed Loaded", function () {
      $scope.newsfeed = feedSvc.getNewsfeed();

      console.log("Newsfeed Loaded", $scope.newsfeed);
    });

    $scope.$on("FeedUrls Loaded", function () {
      $scope.feedUrls = feedSvc.getFeedUrls();
    });
  }]);
