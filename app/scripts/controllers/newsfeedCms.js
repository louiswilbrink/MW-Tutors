'use strict';

angular.module('MWTutorsApp')
  .controller('NewsfeedCmsCtrl', function ($scope, feedSvc) {

    // *** MODEL *** //

    $scope.combinedRssFeed = [];
    $scope.rssFeedUrls = [];

    // *** INITIALIZATION *** //

    // *** USER-ACTIONS *** //

    $scope.toggleArticle = function (article) {

      feedSvc.toggleArticle(article);
    };

    // *** EVENT-HANDLERS *** //

    $scope.$on("RssFeeds Combined", function () {
      $scope.combinedRssFeed = feedSvc.getCombinedRssFeed();
    });

    $scope.$on("RssFeedUrls Loaded", function () {
      $scope.rssFeedUrls = feedSvc.getRssFeedUrls();
    });
  });
