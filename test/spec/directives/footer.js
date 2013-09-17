'use strict';

describe('Directive: footer', function () {
  beforeEach(module('micaApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<footer></footer>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the footer directive');
  }));
});
