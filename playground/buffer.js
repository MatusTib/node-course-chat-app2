let moment = require('moment');
let from = 'Florence';
const buf = Buffer.from('images/cataclysm.jpg', 'binary');
console.log('the buffer=', buf);

let generateImageMessage = (from, img) => {
  console.log('In generateImageMessage:', img);
  return {
    from,
    img,
    createdAt: moment().valueOf()
  };
};

console.log('generateImageMessage:',generateImageMessage(from, buf));
console.log('Buffer length:', buf.length);
console.log('Buffer byte length:', buf.byteLength);
