var _ = require('underscore');
var arr = [3,6,9,1,12];

var first = _.first(arr, 2);
var last = _.last(arr, 3);

console.log(first); // [3,6]
console.log(last); // [9,1,12]