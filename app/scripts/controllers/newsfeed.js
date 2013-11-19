'use strict';

angular.module('MWTutorsApp')
  .controller('NewsfeedCtrl', ['$scope', '$http', 'angularFire', 'feedSvc', function ($scope, $http, angularFire, feedSvc) {

    // *** MODEL *** //

    $scope.feeds = [];
    $scope.feedUrls = [];

    // *** INITIALIZATION *** //

    // *** USER-ACTIONS *** //

    // *** EVENT-HANDLERS *** //

    $scope.$on("Feed Loaded", function () {
      $scope.feeds = feedSvc.getFeeds();
    });

    $scope.$on("FeedUrls Loaded", function () {
      $scope.feedUrls = feedSvc.getFeedUrls();
    });
  }]);
