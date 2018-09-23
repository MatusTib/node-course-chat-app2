require('./config/config');
const path = require('path');

const publicPath = path.join(__dirname, '/../public');

const express = require('express');
const bodyParser = require('body-parser');

// app.use(bodyParser.json());
console.log(path);
console.log(publicPath + '/index.html');

let app = express();

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () => {  //To add: if(!module.parent) {} This will resolve the Error: listen EADDRINUSE :::3000
  console.log(`Started up on port ${port}`);
});

module.exports = {app}
