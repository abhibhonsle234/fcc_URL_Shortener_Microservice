# API Project: URL Shortener Microservice for freeCodeCamp


### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.


#### Creation Example:

POST [project_url]/api/shorturl/new - body (urlencoded) :  url=https://www.google.com

#### Usage:

[this_project_url]/api/shorturl/3

#### Will redirect to:

https://www.freecodecamp.org/forum/

//mongo stuff maybe usefull
var Links /* = <Your Model> */
var linksSchema  = {
  originalUrl:{
    type:String,
    required: true
  },
  shortUrl:Number
}
Links = mongoose.model('Links', linksSchema);

var findLink = function(link, done) {
  
  Links.find({originalUrl:link}, (err, data)=>{
    if(err)
      return done(err);
    return done(null, data /*, data*/);
  });

  var doc = {originalUrl:"link", shortUrl:, favoriteFoods:["Chicken roll", "maggie", "bbs", "psys"]};
  var linked = new Links(doc);
  
  linked.save((err, data)=>{
    if(err)
      return done(err);
    return done(null, data /*, data*/);
  });
  
};