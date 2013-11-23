'use strict';

describe('Service: commonSvc', function () {

  // load the service's module
  beforeEach(module('MWTutorsApp'));

  // instantiate service
  var commonSvc;
  beforeEach(inject(function (_commonSvc_) {
    commonSvc = _commonSvc_;
  }));

  it('should do something', function () {
    expect(!!commonSvc).toBe(true);
  });

});
