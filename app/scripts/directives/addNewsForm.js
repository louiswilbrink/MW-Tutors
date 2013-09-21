'use strict';

angular.module('MWTutorsApp')
  .directive('addNewsForm', function () {
    return {
      templateUrl: 'views/addNewsForm.html',
      restrict: 'E',
      controller: function ($scope) {

        $scope.addNewsForm = {
          m: {
            title: "",
            videoEmbedCode: "",
            transcript: ""
          }
        };

        $scope.addNews = function () {

          console.log($scope.addNewsForm);

          $http.post("php/addNews.php", {
            "title": $scope.addNewsForm.m.title,
            "videoEmbedCode": $scope.addNewsForm.m.videoEmbedCode,
            "transcript": $scope.addNewsForm.m.transcript
            })
            .success(function (data, status) {
              console.log(data);
            });
        }
      }
    };
  });
