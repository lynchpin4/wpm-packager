var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res){
  res.status(200);
  res.set('Content-Type', 'text/html');
  var html = fs.readFileSync(__dirname + '/../index.html')+'';
  res.send(html);
});

app.get('/test', function(req, res){
  res.status(200);
  res.set('Content-Type', 'text/html');
  var html = fs.readFileSync(__dirname + '/../bootloader_test.html')+'';
  res.send(html);
});

app.use('/packages', express.static(__dirname + '/../packages'));
app.use('/build', express.static(__dirname + '/../build'));

app.listen(3000);
console.log("navigate to localhost:3000 to test");

var app2 = express();

app2.get('/', function(req, res){
  res.status(200);
  res.set('Content-Type', 'text/html');
  res.set('Access-Control-Allow-Origin', '*');
  var html = fs.readFileSync(__dirname + '/../iframe_sandbox.html')+'';
  res.send(html);
});

app2.listen(3001);
console.log("sandbox iframe server listening on port 3001");