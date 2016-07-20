'use strict';

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
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Listen on port
app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});