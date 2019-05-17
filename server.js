'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dns = require('dns');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true});

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended : false}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log(getHostName("https://www.freecodecamp.org"));
  res.json({greeting: 'hello API'});
});


function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

var link = 'default'; 
var num = 0;

app.post("/api/shorturl/new", (req, res)=>{
  
  var url = req.body.url;
  console.log(req.body.url);
  var host = getHostName(url);
  dns.lookup(host, (err, add)=>{
    
    console.log(add);
    if(!add)
    {
      console.log({"error":"invalid URL"});
      res.send({"error":"invalid URL"});
    }
    else
    {
      num = Math.floor(Math.random() * 10);
      link = url;
      res.send({"original_url": link, "short_url":num});
    }
    app.get("/api/shorturl/"+num, (req, res)=>{

  res.redirect(link);
  
});
    
  });
  
});



app.listen(port, function () {
  console.log('Node.js listening ...');
});