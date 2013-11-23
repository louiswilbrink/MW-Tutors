'use strict';

describe('Filter: addRemoveArticle', function () {

  // load the filter's module
  beforeEach(module('MWTutorsApp'));

  // initialize a new instance of the filter before each test
  var addRemoveArticle;
  beforeEach(inject(function ($filter) {
    addRemoveArticle = $filter('addRemoveArticle');
  }));

  it('should return the input prefixed with "addRemoveArticle filter:"', function () {
    var text = 'angularjs';
    expect(addRemoveArticle(text)).toBe('addRemoveArticle filter: ' + text);
  });

});
