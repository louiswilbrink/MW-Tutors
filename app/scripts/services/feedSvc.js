'use strict';

angular.module('MWTutorsApp')
  .service('feedSvc', ['$rootScope', '$http', 'angularFire', function ($rootScope, $http, angularFire) {

    /*** MODEL ***/

    var scope = $rootScope.$new();
        scope.feedUrls = [];
        scope.newsfeed = [];
        scope.rssFeeds = [];
        scope.displayArticles = {};

    var feedUrlsRef = null;
    var articlesRef = null;

    /*** METHODS ***/

    var getFeedArticlesIntersection = function (articles) {

      var newsfeedArticles = [];

      angular.forEach(articles, function (article) {
        angular.forEach(scope.displayArticles, function (displayArticle) {
          if (displayArticle.title === article.title) {
            newsfeedArticles.push(article);
          }
        });
      });

      return newsfeedArticles;
    };

    var getNewsfeeds = function () {

      scope.newsfeed = [];

      angular.forEach(scope.rssFeeds, function (rssFeed) {

        var newsfeed = {};

        newsfeed.site = rssFeed.title;
        newsfeed.articles = getFeedArticlesIntersection(rssFeed);

        scope.newsfeed.push(newsfeed);
      });

      console.log("Newsfeed Loaded", scope.newsfeed);
      $rootScope.$broadcast("Newsfeed Loaded");
    };


    var getRssFeeds = function () {

      angular.forEach(scope.feedUrls, function (url) {
        $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url)).then(function (results) {

          scope.rssFeeds.push(results.data.responseData.feed.entries);

          $rootScope.$broadcast("RssFeeds Loaded");

          getNewsfeeds();
        })
      });
    };

    var getArticlesToDisplay = function () {

      articlesRef = new Firebase("https://mwtutors.firebaseio.com/articles");

      articlesRef.on('value', function (snapshot) {

        scope.displayArticles = snapshot.val();

        console.log("Display articles loaded: ", scope.displayArticles);
      });
    };

    var getFeedUrls = function () {

      feedUrlsRef = new Firebase("https://mwtutors.firebaseio.com/feedUrls");

      feedUrlsRef.on('value', function (snapshot) {

        scope.feedUrls = snapshot.val();

        console.log("FeedUrls Loaded", scope.feedUrls);

        $rootScope.$broadcast("FeedUrls Loaded", scope.feedUrls);

        getRssFeeds();
      });
    };

    /*** INITIALIZTION ***/

    getArticlesToDisplay();
    getFeedUrls();

    /*** EVENT HANDLERS ***/

    scope.$watch(function () { return scope.newsfeed.length; }, function (newValue, oldValue) {

      if (scope.newsfeed.length === scope.feedUrls.length && scope.newsfeed.length !== 0) {
        console.log("All feeds loaded: ", scope.newsfeed);
      }
    });

    /*** API ***/

    return {

      init: function () {

        console.log("Initializing: FeedSvc..");
        getFeedUrls();

      },

      getNewsfeed: function () {
        
        return scope.newsfeed;

      },

      getFeedUrls: function () {

        return scope.feedUrls;

      },

      getRssFeeds: function () {

        return scope.rssFeeds;
      }
    }
  }]);
