'use strict';

angular.module('MWTutorsApp')
  .filter('addRemoveArticle', function () {
    return function (isSavedArticle) {

      if(isSavedArticle) {
        return "Remove From Newsfeed";
      }

      return "Add to Newsfeed";
    };
  });
