'use strict';

angular.module('MWTutorsApp')
  .service('feedSvc', ['$rootScope', '$http', 'commonSvc', 'angularFire', function ($rootScope, $http, commonSvc, angularFire) {

  /*** MODEL ***/

  var scope = $rootScope.$new();
      scope.rssFeedUrls = [];
      scope.rssFeeds = [];
      scope.combinedRssFeed = [];
      scope.newsfeed = [];
      scope.savedArticles = {};
      scope.initialized = false;

  var isOffline = false;

  if (!isOffline) {
    // firebase: convert feedUrls to rssFeedUrls
    var rssFeedUrlsRef = new Firebase("https://mwtutors.firebaseio.com/feedUrls");
    var savedArticlesRef = new Firebase("https://mwtutors.firebaseio.com/savedArticles");
  }

  /*** METHODS ***/

  var toggleArticle = function (article) {

    article.isSavedArticle = !article.isSavedArticle;

    if(!isOffline) {
      if (article.isSavedArticle) {
        console.log("Saving article:", article.title);
        savedArticlesRef.push(article.title);
      }
      else {
        savedArticlesRef.once('value', function (savedArticlesSnapShot) {
          savedArticlesSnapShot.forEach(function (childSnapShot) {
            if(article.title === childSnapShot.val()) {
              console.log("Removing article:", childSnapShot.val());
              childSnapShot.ref().remove(function (error) {
                if (error) {
                  console.log("Error removing:", childSnapShot.val(), error);
                }
              });
            }
          });
        });
      }
    }
  };

  var areAllRssFeedsLoaded = function () {

    var areAllRssFeedsLoaded = true;

    angular.forEach(scope.rssFeedUrls, function (rssFeedUrl) {
      var hasUrl = false;

      angular.forEach(scope.rssFeeds, function (rssFeed) {
        if (rssFeed.url === rssFeedUrl) {
          hasUrl = true;
        }
      })

      if (!hasUrl) {
        areAllRssFeedsLoaded = false;
      }
    });

    return areAllRssFeedsLoaded;
  };

  var buildNewsFeed = function () {

    scope.newsfeed = [];

    angular.forEach(scope.combinedRssFeed, function (combinedRssFeedArticle) {
      angular.forEach(scope.savedArticles, function (savedArticle) {

        if (combinedRssFeedArticle.title === savedArticle) {
          scope.newsfeed.push(combinedRssFeedArticle);
          combinedRssFeedArticle.isSavedArticle = true;
        }
      });
    });

    if (areAllRssFeedsLoaded()) {
      console.log("Newfeed fully built!", scope.newsfeed);
    }

    $rootScope.$broadcast("Newsfeed Built");
  };

  var combineRssFeeds = function () {

    scope.combinedRssFeed = [];

    angular.forEach(scope.rssFeeds, function (rssFeed) {
      angular.forEach(rssFeed.articles, function (article) {

        var combinedRssFeedArticle = {};

        combinedRssFeedArticle.site = rssFeed.site;
        combinedRssFeedArticle.title = article.title;
        combinedRssFeedArticle.date = article.publishedDate;
        combinedRssFeedArticle.link = article.link;
        combinedRssFeedArticle.content = article.content;
        combinedRssFeedArticle.isSavedArticle = false;

        scope.combinedRssFeed.push(combinedRssFeedArticle);
      });
    });

    if (areAllRssFeedsLoaded()) {
      console.log("RssFeeds Combined!");
    }

    $rootScope.$broadcast("RssFeeds Combined");

    buildNewsFeed();
  };

  var getRssFeeds = function () {

    scope.rssFeeds = [];

    angular.forEach(scope.rssFeedUrls, function (url, key) {
      $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url)).then(function (results) {

        var rssFeed = {};

        rssFeed.site = results.data.responseData.feed.title;
        rssFeed.articles = results.data.responseData.feed.entries;
        rssFeed.url = url;

        scope.rssFeeds.push(rssFeed);

        if (areAllRssFeedsLoaded()) {
          console.log("All RssFeeds Loaded", scope.rssFeeds);
        }

        combineRssFeeds();
      })
    });
  };

  var getSavedArticles = function () {

    savedArticlesRef.on('value', function (snapshot) {

      scope.savedArticles = snapshot.val();

      console.log("Saved Articles Loaded: ", scope.savedArticles);
    });
  };

  var getRssFeedUrls = function () {

    rssFeedUrlsRef.on('value', function (snapshot) {

      scope.rssFeedUrls = snapshot.val();

      $rootScope.$broadcast("RssFeedUrls Loaded", scope.rssFeedUrls);

      getRssFeeds();
    });
  };

  var initialize = function () {

    if (isOffline) {
      console.log("Loading offline mockFeeds");
      $http.get("mockFeed.json").then(function (response) {
        var mockFeed = response.data;
        scope.combinedRssFeed = commonSvc.objectToArray(mockFeed);
        scope.newsfeed = commonSvc.objectToArray(mockFeed);
        $rootScope.$broadcast("Newsfeed Built");
        $rootScope.$broadcast("RssFeeds Combined");
      });
      return;
    }
    else {
      console.log("Initializing Feed Service...");
      getSavedArticles();
      getRssFeedUrls();
    }
  };

  /*** INITIALIZTION ***/

  /*** EVENT HANDLERS ***/

  /*** API ***/

  return {

    initialize: initialize,

    getNewsfeed: function () {
      
      return scope.newsfeed;

    },

    getRssFeedUrls: function () {

      return scope.rssFeedUrls;

    },

    toggleArticle: toggleArticle,

    getCombinedRssFeed: function () {

      return scope.combinedRssFeed;
    }
  }
}]);
