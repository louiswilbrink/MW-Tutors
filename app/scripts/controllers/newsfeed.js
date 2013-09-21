'use strict';

angular.module('MWTutorsApp')
  .controller('NewsfeedCtrl', function ($scope, $http) {

    $scope.newsfeed = {
      m: {
        title: "",
        videoEmbedCode: "",
        transcript: ""
      }
    };

    $scope.addNews = function () {

      console.log($scope.newsfeed);

      $http.post("php/addNews.php", {
        "title": $scope.newsfeed.m.title,
        "videoEmbedCode": $scope.newsfeed.m.videoEmbedCode,
        "transcript": $scope.newsfeed.m.transcript
        })
        .success(function (data, status) {
          console.log(data);
        });
    };
  });
