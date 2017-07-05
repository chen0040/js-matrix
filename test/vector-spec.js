var expect = require('chai').expect;
var jsmatrix = require('../src/jsmatrix');

describe('Sparse Vector', function(){
   describe('copy() and makeCopy()', function(){
     it('should make copy of the original vector', function(){
        var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
        var vector2 = vector1.makeCopy();
        expect(vector2.get(0)).to.equal(0);
        expect(vector2.get(1)).to.equal(3);
        expect(vector2.get(2)).to.equal(0);
        expect(vector2.get(3)).to.equal(0);
        expect(vector2.get(4)).to.equal(0);
        expect(vector2.get(5)).to.equal(2);
        expect(vector2.get(7)).to.equal(4);
        expect(vector2.get(8)).to.equal(0);
        expect(vector2.get(9)).to.equal(0);
     });  
   });
   describe('set() and get()', function(){
      it('should return 0 when set a value smaller than 0.000000000000001 at an index', function(){
         var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
         vector1.set(1, 0.000000000000002);
         vector1.set(5, 0.0000000000000001);
         expect(vector1.get(1)).to.equal(0.000000000000002);
         expect(vector1.get(5)).to.equal(0);
      });
   });
});