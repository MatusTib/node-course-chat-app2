//Unix epic UTC Jan 1st 1970 00:00:00 am
// let date = new Date();
// console.log('The month is: ', date.getMonth());
// let moment = require('moment');
//
// let date = moment();
// console.log(date.format('MMM Do, YYYY H:mm:ss'));

let moment = require('moment');
let createdAt = new Date().getTime();

let date = moment();
let someTimestamp = moment().valueOf();
console.log('The current time is:', date.format('h:mm a'));
// date.add(5,'hour');
// console.log('In 5 hours the time will be:', date.format('h:mm a'));
// date.add(12,'hour');
// console.log('In 12 hours the time will be:', date.format('h:mm a'));
date = moment(createdAt);
console.log('Created at:', date.format('h:mm a'));
console.log('createdAt = ', createdAt, 'someTimestamp = ', someTimestamp);
