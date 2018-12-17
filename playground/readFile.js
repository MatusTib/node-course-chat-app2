const fs = require('fs');

var generateImageMessage = (from, img) => {
  console.log('In generateImageMessage:', img);
  return {
    from,
    img,
    createdAt: moment().valueOf()
  };
};

fs.readFile('cataclysm.jpg', (err, data) => {
  if (err) throw err;
  console.log(data);

  fs.writeFile('imageOut.jpg',data, (err) => {
    if (err) throw err;
    console.log('The File has been saved!');
  });

});
