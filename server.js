var request = require("request");
var parseString = require('xml2js').parseString;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(function(req,res,next){
 res.header("Content-Type", "application/json");
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
 next();
});

app.get('/', function (req, res) {

console.log(req.query.url);
request({
  uri: req.query.url,
  method: "GET",
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10
}, function(error, response, body) {
	parseString(body,{"attrkey":"settings", 
                    "explicitArray":false,
                    "mergeAttrs": true}, function (err, result) {
	res.send(JSON.stringify(result));  	  
	console.dir(result);
	});
});

  
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

 

