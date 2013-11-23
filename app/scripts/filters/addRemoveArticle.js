'use strict';

angular.module('MWTutorsApp')
  .filter('addRemoveArticle', function () {
    return function (isSavedArticle) {

      if(isSavedArticle) {
        return "Add to Newsfeed";
      }

      return "Remove From Newsfeed";
    };
  });
