'use strict';

var logger = require('morgan');
var key = 0;
var a = "www.";
var b = "http://";
var c = "https://"
var regex = /(www.|http:\/\/|https:\/\/)(www.\w*\.|\w*\.)(\w*\.\w*|\w*)/g;


//Express
var express = require('express');
var app = express();

//Mongoose
var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI;
mongoose.connect(url);
var conn = mongoose.connection;
var coll = conn.collection('urls');
//var key = Number(coll.find().sort({key:-1}).limit(1)) + 1;

var urlSchema = mongoose.Schema({
    origurl          : String,
    newurl     : String,
    key      : String
});



//Get URLs

app.get('/new/:origurl*', function(req, res) {
    var origurl = req.params['origurl'] + req.params[0];
    var newurl = "https://stshorturl.herokuapp.com/" + key;
    //if ((origurl.substring(0, a.length) === a) || (origurl.substring(0, b.length) === b) || (origurl.substring(0, c.length) === c)) {
    var regexorigurl = regex.exec(origurl);
    if (regexorigurl) {
    var doc = {'origurl': origurl, 'newurl': newurl, 'key': key.toString()};
    conn.collection('urls').insert(doc);
    res.json(doc);
    key = key + 1; }
    else {
        res.json({"status": "Invalid URL"});
    }
});


//Pull URLs
app.get('/:number', function(req, res) {
    var number = req.params.number;
    coll.findOne({'key': number}, function(err, site) {
        if (err) {console.log(err); res.redirect("/");} 
        else {
            if (site) {
                console.log('Found URL');
                console.log(site.origurl);
                if (site.origurl.substring(0, a.length) === a) {
                    res.redirect('http://' + site.origurl);
                } else if ((site.origurl.substring(0, b.length) === b) || (site.origurl.substring(0,c.length) === c)) {
                res.redirect('' + site.origurl);
            }
            else {
                res.redirect('/');
            }
        }
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