'use strict';

describe('Directive: jumbotron', function () {
  beforeEach(module('micaApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<jumbotron></jumbotron>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the jumbotron directive');
  }));
});
