'use strict';

describe('Controller: TestPageJsCtrl', function () {

  // load the controller's module
  beforeEach(module('MWTutorsApp'));

  var TestPageJsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestPageJsCtrl = $controller('TestPageJsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
