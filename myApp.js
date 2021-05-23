var express = require('express');
var app = express();
console.log("Hello World")
app.use("/public", express.static(__dirname + "/public"));
app.get('/', function(req, res) {
 var absolutePath = __dirname + '/views/index.html'
 res.sendFile(absolutePath)
});






























 module.exports = app;
