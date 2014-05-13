var express = require("express"),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 37120;
    
app.get("/", function(req, res) {
  res.redirect("/index.html");
});

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '../build'));
  app.use(express.static(__dirname + '../scripts'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
});

var router = express.Router();

router.get('/test', function(req, res, next) {
	res.send('asdsadgadfhadfh');
	next();
});

app.use('/', router);

app.listen(port);