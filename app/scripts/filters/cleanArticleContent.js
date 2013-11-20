'use strict';

angular.module('MWTutorsApp')
  .filter('cleanArticleContent', function () {
    return function (input) {

      var output = input;

      if (input.search("<div>") > -1) {
        output = input.substring(0, input.search("<div>"));
      }

      return output;
    };
  });
