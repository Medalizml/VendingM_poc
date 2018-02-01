var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');

var app = express();
var http = require('http').Server(app);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

app.use('/', routes);

// START THE SERVER
// =============================================================================
http.listen(port,function () {
    console.log('Magic happens on port ' + port);
});

