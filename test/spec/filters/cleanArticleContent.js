'use strict';

describe('Filter: cleanArticleContent', function () {

  // load the filter's module
  beforeEach(module('MWTutorsAppApp'));

  // initialize a new instance of the filter before each test
  var cleanArticleContent;
  beforeEach(inject(function ($filter) {
    cleanArticleContent = $filter('cleanArticleContent');
  }));

  it('should return the input prefixed with "cleanArticleContent filter:"', function () {
    var text = 'angularjs';
    expect(cleanArticleContent(text)).toBe('cleanArticleContent filter: ' + text);
  });

});
