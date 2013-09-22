'use strict';

angular.module('MWTutorsApp')
  .directive('addNewsForm', function () {
    return {
      templateUrl: 'views/addNewsForm.html',
      restrict: 'E',
      controller: function ($scope, $http) {

        $scope.addNewsForm = {
          m: {
            title: "",
            videoEmbedCode: "",
            transcript: ""
          }
        };

        $scope.addNews = function () {

          $http.post("php/addNews.php", {
            "title": $scope.addNewsForm.m.title,
            "imageUrl": $scope.addNewsForm.m.imageUrl,
            "videoEmbedCode": $scope.addNewsForm.m.videoEmbedCode,
            "transcript": $scope.addNewsForm.m.transcript
            })
            .success(function (data, status) {
              $scope.$broadcast("NewsAdded", $scope.addNewsForm.m);
            })
            .error(function (data, status) {
              console.log(data);
            });
        }
      }
    };
  });
