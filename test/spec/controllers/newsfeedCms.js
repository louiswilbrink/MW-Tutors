'use strict';

describe('Controller: NewsfeedcmsCtrl', function () {

  // load the controller's module
  beforeEach(module('MWTutorsAppApp'));

  var NewsfeedcmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewsfeedcmsCtrl = $controller('NewsfeedcmsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
