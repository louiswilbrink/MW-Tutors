'use strict';

describe('Directive: addNewsForm', function () {

  // load the directive's module
  beforeEach(module('MWTutorsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-news-form></add-news-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addNewsForm directive');
  }));
});
