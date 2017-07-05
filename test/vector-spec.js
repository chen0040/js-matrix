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
});