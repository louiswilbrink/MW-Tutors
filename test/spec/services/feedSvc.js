'use strict';

describe('Service: feedSvc', function () {

  // load the service's module
  beforeEach(module('MWTutorsAppApp'));

  // instantiate service
  var feedSvc;
  beforeEach(inject(function (_feedSvc_) {
    feedSvc = _feedSvc_;
  }));

  it('should do something', function () {
    expect(!!feedSvc).toBe(true);
  });

});
