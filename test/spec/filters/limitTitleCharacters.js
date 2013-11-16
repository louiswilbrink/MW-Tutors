'use strict';

describe('Filter: limitTitleCharacters', function () {

  // load the filter's module
  beforeEach(module('MWTutorsApp'));

  // initialize a new instance of the filter before each test
  var limitTitleCharacters;
  beforeEach(inject(function ($filter) {
    limitTitleCharacters = $filter('limitTitleCharacters');
  }));

  it('should return the input prefixed with "limitTitleCharacters filter:"', function () {
    var text = 'angularjs';
    expect(limitTitleCharacters(text)).toBe('limitTitleCharacters filter: ' + text);
  });

});
