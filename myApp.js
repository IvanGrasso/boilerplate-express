require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// Log to the console
console.log("Hello World");

// Middleware

// Root-level request logger
app.use(function(req, res, next) {
 console.log(req.method + " " + req.path + " - " + req.ip);
 next();
});

// Mount POST requests body parser
app.use(bodyParser.urlencoded({extended: false}));

// Routing

// Serve HTML file
app.get('/', function(req, res) {
 var absolutePath = __dirname + '/views/index.html';
 res.sendFile(absolutePath);
});

// Serve static assets
app.use('/public/', express.static(__dirname + '/public'));

// API

// Using .env file
app.get('/json', function(req, res) {
 if (process.env.MESSAGE_STYLE === "uppercase") {
  res.json({"message": "HELLO JSON"});
 } else {
  res.json({"message": "Hello json"});
 }
});

// Time server by chaining middleware
app.get('/now', function (req, res, next) {
 req.time = new Date().toString();
 next();
}, function (req, res) {
 res.json({time: req.time});
});

// Get Route Parameter Input from the Client
app.get('/:word/echo', function (req, res) {
 res.json({"echo": req.params.word})
});

// Get Query/Body Parameter Input from the Client
app.route('/name').get(function (req, res) {
 res.json({name: req.query.first + " " + req.query.last})
}).post(function (req, res){
 res.json({name: req.body.first + " " + req.body.last})
})

module.exports = app;