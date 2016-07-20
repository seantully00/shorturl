'use strict';

var logger = require('morgan');
var key = 0;

//Express
var express = require('express');
var app = express();

//Mongoose
var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI;
mongoose.connect(url);
var conn = mongoose.connection;


//Get URLs
app.get('/new/:origurl', function(req, res) {
    var origurl = req.params.origurl;
    var newurl = "https://sturlshortener.herokuapp.com/" + key;
    key = key + 1;
    var doc = {'origurl': origurl, 'newurl': newurl};
    res.write(JSON.stringify(doc));
    conn.colection('urls').insert(doc);
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