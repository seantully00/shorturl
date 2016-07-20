'use strict';

var logger = require('morgan');

//Express
var express = require('express');
var app = express();

//MongoDB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOLAB_URI;

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