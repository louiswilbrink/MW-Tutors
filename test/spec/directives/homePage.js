'use strict';

describe('Directive: homePage', function () {

  // load the directive's module
  beforeEach(module('MWTutorsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<home-page></home-page>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the homePage directive');
  }));
});
