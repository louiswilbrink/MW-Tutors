'use strict';

angular.module('MWTutorsApp')
  .controller('NewsfeedCmsCtrl', function ($scope, feedSvc) {

    // *** MODEL *** //

    $scope.newsfeed = [];
    $scope.rssFeeds = [];
    $scope.feedUrls = [];

    // *** INITIALIZATION *** //

    // *** USER-ACTIONS *** //

    $scope.toggleArticle = function (article) {

      feedSvc.saveArticle(article);
    };

    // *** EVENT-HANDLERS *** //

    $scope.$on("Newsfeed Loaded", function () {
      $scope.newsfeed = feedSvc.getNewsfeed();
    });

    $scope.$on("RssFeeds Loaded", function () {
      $scope.rssFeeds = feedSvc.getRssFeeds();
      console.log("Rss Feeds: ", $scope.rssFeeds);
    });

    $scope.$on("FeedUrls Loaded", function () {
      $scope.feedUrls = feedSvc.getFeedUrls();
    });
  });
