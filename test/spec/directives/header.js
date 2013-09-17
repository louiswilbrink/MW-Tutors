'use strict';

describe('Directive: header', function () {
  beforeEach(module('micaApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<header></header>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the header directive');
  }));
});
