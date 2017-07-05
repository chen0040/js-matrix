var expect    = require("chai").expect;
var jsmatrix = require("../src/jsmatrix");

describe("Matrix", function() {
  describe("test zero", function() {
      it('should return true if value is smaller than 0.000000000000001', function(){
        expect(jsmatrix.isZero(0.000000000000002)).to.equal(false);
        expect(jsmatrix.isZero(0.0000000000000005)).to.equal(true);     
      });
  });


});