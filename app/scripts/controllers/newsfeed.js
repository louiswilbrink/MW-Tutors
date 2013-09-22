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

    $http.post("php/getNewsfeed.php")
      .success(function (data, status) {
        $scope.newsfeed.m.news = data['newsfeed'];
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
