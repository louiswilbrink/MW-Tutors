'use strict';

angular.module('micaApp')
  .directive('jumbotron', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the jumbotron directive');
      }
    };
  });
