'use strict';

angular.module('MWTutorsApp')
  .controller('NewsfeedCtrl', function ($scope, $http) {

    // *** MODEL *** //

    $scope.newsfeed = {
      m: {
        news: []
      }
    };

    // *** INITIALIZATION *** //

    String.prototype.decodeHTML = function() {
        var map = {"gt":">" /* , … */};
        return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
            if ($1[0] === "#") {
                return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
            } else {
                return map.hasOwnProperty($1) ? map[$1] : $0;
            }
        });
    };

    $http.post("php/getNewsfeed.php")
      .success(function (data, status) {
        $scope.newsfeed.m.news = data['newsfeed'];

        angular.forEach($scope.newsfeed.m.news, function (value, key) {
          $scope.newsfeed.m.news[key].transcript = value.transcript.decodeHTML().split("\n");
        });
      });

    // *** USER-ACTIONS *** //

    $scope.deleteNews = function (news, index) {

      $scope.newsfeed.m.news.splice(index, 1);

      $http.post("php/deleteNews.php", {
        "id": news.id
        })
        .success(function (data, status) {
          console.log(data['log']);
        });
    };

    // *** EVENT-HANDLERS *** //

    $scope.$on("NewsAdded", function (event, value) {

      var newsEntry = [];

      newsEntry.title = value.title;
      newsEntry.imageUrl = value.imageUrl;
      newsEntry.videoEmbedCode = value.videoEmbedCode;
      newsEntry.transcript = value.transcript;
      newsEntry.timestamp = new Date();

      $scope.newsfeed.m.news.push(newsEntry);
    });
  });
