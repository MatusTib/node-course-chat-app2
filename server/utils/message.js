var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from,latitude,longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

//generateImageMessage
var generateImageMessage = (from, img) => {
  // console.log('In generateImageMessage img:', img);//---------TRACE
  // const buf = Buffer.from(img, 'binary');
  // console.log('In generateImageMessage Buffer:', buf);//---------TRACE
  return {
    from,
    img,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage, generateImageMessage};
