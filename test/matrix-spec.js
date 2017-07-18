var expect    = require("chai").expect;
var jsmatrix = require("../src/jsmatrix");

describe("Matrix", function() {
  describe("test zero", function() {
      it('should return true if value is smaller than 0.000000000000001', function(){
        expect(jsmatrix.isZero(0.000000000000002)).to.equal(false);
        expect(jsmatrix.isZero(0.0000000000000005)).to.equal(true);     
      });
  });
    
  describe("columnVectors()", function(){
      it('should return column vectors which are not zero only', function() {
        var m = new jsmatrix.Matrix(10, 10);
        m.set(0, 1, 10);
          m.set(3, 2, 5);
          m.set(1, 2, 1);
          var columnVectors = m.columnVectors();
          for(var columnIndex in columnVectors) {
              console.log("column: " + columnIndex);
          }
          expect(columnVectors[1].get(0)).to.equal(10);
          expect(columnVectors[2].get(1)).to.equal(1);
          expect(columnVectors[2].get(3)).to.equal(5);
          expect(columnVectors[0]).to.equal(undefined);
          expect(columnVectors[3]).to.equal(undefined);
          expect(columnVectors[4]).to.equal(undefined);
          expect(columnVectors[5]).to.equal(undefined);
          expect(columnVectors[6]).to.equal(undefined);
          expect(columnVectors[7]).to.equal(undefined);
          expect(columnVectors[8]).to.equal(undefined);
          expect(columnVectors[9]).to.equal(undefined);
      });
      
      
  });


});