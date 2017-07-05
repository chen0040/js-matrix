var jsmatrix = jsmatrix || {};

(function(jss){
    jss.isZero = function(val) {
        if(Math.abs(val) < 0.000000000000001) {
            return true;
        }  
        return false;
    };
    
	var Vector = function(dimension, data){
        this.dimension = dimension;
        this.id = -1;
        this.data = {};
        if(data) {
            this.data = data;
        }
    };
    
    Vector.prototype.copy = function(that) {
        this.data = {};
        for(var key in that.data) {
            this.data[key] = that.data[key]
        }  
        this.dimension = that.dimension;
        this.id = that.id;
    };
    
    Vector.prototype.makeCopy = function() {
        var clone = new Vector(this.dimension);
        clone.copy(this);
        return clone;
    };
    
    Vector.prototype.get = function(index) {
        if(index in this.data) {
            return this.data[index];
        }  
        return 0;
    };
    
    Vector.prototype.set = function(index, value) {
        if(index >= 0 && index < this.dimension) {
            if(jss.isZero(value)){
                delete this.data[index];
            } else {
                this.data[index] = value;
            }
        }  
    };
    

    jss.Vector = Vector;

})(jsmatrix);

var module = module || {};
if(module) {
	module.exports = jsmatrix;
}