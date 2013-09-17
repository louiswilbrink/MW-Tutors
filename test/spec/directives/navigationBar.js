'use strict';

describe('Directive: navigationBar', function () {
  beforeEach(module('micaApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<navigation-bar></navigation-bar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the navigationBar directive');
  }));
});
