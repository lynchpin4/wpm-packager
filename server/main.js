var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res){
  res.status(200);
  res.set('Content-Type', 'text/html');
  var html = fs.readFileSync(__dirname + '/../bootloader_test.html')+'';
  res.send(html);
});

app.use('/packages', express.static(__dirname + '/../packages'));
app.use('/build', express.static(__dirname + '/../build'));

app.listen(3000);
console.log("navigate to localhost:3000 to test");