var moment = require('moment');

var now = moment();
console.log(now.format('x'));
// in order to compare, must convert to int
//var iNow = now.format('x').valueOf();
var timestamp = 1460493631709;
var timestampMoment = moment.utc(timestamp);
console.log('Timestamp: ' + timestampMoment.format('h:mm A'));

// console.log('Timestamp: ' + now.format()); // YYYY-MM-DD T24:MM:SS-GMT offset
// console.log('Pretty Time: ' + now.format('MMM Do YYYY, h:mm A')) // Oct 5th 2015, 6:45 PM
// console.log('UNIX timestamp: ' + now.format('X'));
// console.log('JS UNIX timestamp: ' + iNow);
