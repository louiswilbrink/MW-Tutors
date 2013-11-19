'use strict';

angular.module('MWTutorsApp')
  .service('feedSvc', ['$rootScope', '$http', 'angularFire', function ($rootScope, $http, angularFire) {

    /*** MODEL ***/

    var scope = $rootScope.$new();
        scope.feedUrls = [];
        scope.feeds = [];

    var feedUrlsRef = null;

    /*** METHODS ***/

    var getFeeds = function () {

      angular.forEach(scope.feedUrls, function (url) {
        $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url)).then(function (results) {
          scope.feeds.push(results.data.responseData.feed.entries);
          $rootScope.$broadcast("Feed Loaded");
        });
      });
    };

    var getFeedUrls = function () {

      feedUrlsRef = new Firebase("https://mwtutors.firebaseio.com/feedUrls");

      feedUrlsRef.on('value', function (snapshot) {

        scope.feedUrls = snapshot.val();

        console.log("FeedUrls Loaded", scope.feedUrls);

        $rootScope.$broadcast("FeedUrls Loaded", scope.feedUrls);

        getFeeds();
      });
    };

    /*** INITIALIZTION ***/

    getFeedUrls();

    /*** EVENT HANDLERS ***/

    scope.$watch(function () { return scope.feeds.length; }, function (newValue, oldValue) {

      if (scope.feeds.length === scope.feedUrls.length && scope.feeds.length !== 0) {
        console.log("All feeds loaded: ", scope.feeds);
      }
    });

    /*** API ***/

    return {

      init: function () {

        console.log("Initializing: FeedSvc..");
        getFeedUrls();

      },

      getFeeds: function () {
        
        return scope.feeds;

      },

      getFeedUrls: function () {

        return scope.feedUrls;

      }
    }
  }]);
