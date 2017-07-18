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
    
    Vector.prototype.isZero = function() {
        for(var index in this.data) {
            return false;
        }
        return true;
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
    
    Vector.prototype.indexWithMinValue = function() {
        var minValue = Number.MIN_VALUE;
        var indexWithMinValue = -1;
        
        var count = 0;
        for(var index in this.data) {
            if(minValue > this.data[index]) {
                minValue = this.data[index];
                indexWithMinValue = index;
            }
            count++;
        }
        
        if(count < this.dimension && minValue > 0) {
            minValue = 0;
            for(var i = 0;  i < this.dimension; ++i) {
                if(!(i in this.data)){
                    indexWithMinValue = i;
                    break;
                }
            }
        }
        
        return {
            index : indexWithMinValue,
            value: minValue
        };
    };
    
    Vector.prototype.dotProduct = function(that) {
        var result = 0;
        for(var index in this.data) {
            result += this.data[index] * that.get(index);
        }  
        return result;
    };
    
    Vector.prototype.scaleBy = function(scalar) {
        var clone = this.makeCopy();
        for(var index in this.data) {
            clone.set(index, this.data[index] * scalar);
        }
        return clone;
    };
    
    Vector.prototype.minus = function(that) {
        var result = this.makeCopy();
        for(var i=0; i < this.dimension; ++i) {
            result.set(i, this.get(i) - that.get(i));
        }
        return result;
    };
    
    Vector.prototype.projectAlong = function(that, extra) {
        var norm_a = that.dotProduct(that);
        if(jss.isZero(norm_a)) {
            return new Vector(this.dimension);
        }
        var scalar = this.dotProduct(that) / norm_a;
        if(extra) {
            extra.scalar = scalar;
        }
        return that.scaleBy(scalar);
    };
    
    Vector.prototype.length = function() {
        return Math.sqrt(this.dotProduct(this));  
    };
    
    Vector.prototype.minus = function(that) {
        var result = this.makeCopy();
        for(var index = 0; index < this.dimension; ++index) {
            result.set(index, this.get(index) - that.get(index));
        }
        return result;
    };
    
    Vector.prototype.projectOrthogonal = function(vectors, sigma) {
        var b = this.makeCopy();
        for(var i=0; i < vectors.length; ++i) {
            var extra = {};
            b = b.minus(b.projectAlong(vectors[i], extra));
            if(sigma) {
                sigma[i] = extra.scalar;
            }
        }
        return b;
    };
    
    Vector.prototype.norm = function(level) {
        var result = 0;
        if(level == 1) {
            for(var index in this.data) {
                result += Math.abs(this.data[index]);
            }
        } else if (level == 2) {
            return this.length();
        } else {
            for(var index in this.data) {
                result += Math.pow(Math.abs(this.data[index]), 1.0 / level);
            }
        }
        return result;
    };
    

    jss.Vector = Vector;
    
    var Matrix = function(rowCount, columnCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.rows = {};
    };
    
    Matrix.prototype.get = function(rowIndex, columnIndex) {
        if(rowIndex in this.rows) {
            return this.rows[rowIndex].get(columnIndex);
        } else {
            return 0;
        }
    };
    
    Matrix.prototype.set = function(rowIndex, columnIndex, val) {
        if(jss.isZero(val)) {
            return;
        }  
        if(rowIndex in this.rows) {
            this.rows[rowIndex].set(columnIndex, val);
        } else {
            var row = new jss.Vector(this.columnCount);
            row.set(columnIndex, val);
            this.rows[rowIndex] = row;
        }
    };
    
    Matrix.prototype.columnVectors = function () {
        var columns = {};
        for(var columnIndex = 0; columnIndex < this.columnCount; ++columnIndex) {
            var column = new jss.Vector(this.rowCount);
            for(var rowIndex = 0; rowIndex < this.rowCount; ++rowIndex) {
                var val = this.get(rowIndex, columnIndex);
                if(val != 0) {
                    column.set(rowIndex, val);
                }
            }
            if(column.isZero()) {
                continue;
            }
            columns[columnIndex] = column;
        }
        return columns;
    };
    
    
    jss.Matrix = Matrix;

})(jsmatrix);

var module = module || {};
if(module) {
	module.exports = jsmatrix;
}