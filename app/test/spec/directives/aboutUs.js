'use strict';

describe('Directive: aboutUs', function () {

  // load the directive's module
  beforeEach(module('appApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<about-us></about-us>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the aboutUs directive');
  }));
});
