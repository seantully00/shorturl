'use strict';

var logger = require('morgan');
var key = 0;

//Express
var express = require('express');
var app = express();

//Mongoose
var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI;
var conn = mongoose.connect(url);

var urlSchema = mongoose.Schema({
    origurl          : String,
    newurl     : String,
    key      : Number
});


function urltest(testurl) {
    var a = "www.";
    var b = "http";
    if (testurl.substring(0, a.length) != a || testurl.substring(0, b.length) != b) {
        console.log("Error: Not an acceptable url");
    }
}

//Get URLs
app.get('/new/:origurl', function(req, res) {
    var origurl = req.params.origurl;
    var newurl = "https://stshorturl.herokuapp.com/" + key;
    urltest(origurl);
    var doc = {'origurl': origurl, 'newurl': newurl, 'key': key};
    conn.collection('urls').insert(doc);
    res.json(doc);
    key = key + 1;
});

//Pull URLs
app.get('/:number', function(req, res) {
    var number = req.params.number;
    conn.find({"key": number}).limit(1).toArray(function(err, doc) {    
      if (err) {
        throw err;
      }
      if (doc.length === 0) {
        res.json({"error": "Unable to find original url."});
      } else {
        res.redirect(doc[0].origurl);
      }
    });
});


//Define port
var port = process.env.PORT || 8080;


//Jade
var path = require('path');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.get('/', function(req, res, next){
    res.render('index', {
    });
});

//Listen on port
app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});