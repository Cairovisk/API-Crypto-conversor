const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  // console.log(req.body.crypto);

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var defaultUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  var completeUrl = defaultUrl + crypto + fiat;

  request(completeUrl, function(error, response, body){
    var data = JSON.parse(body);
    var price = JSON.last;
    // data.display_timestamp é o caminho para a data no JSON 
    var currentDate = data.display_timestamp;

    res.write("<p>The current Date is " + currentDate);

    res.write("<h1> The current price of " + crypto + " is " + price + fiat + "</h1>");

    res.send(); 

  });
});

app.listen(3000, function() {
  console.log("Server is running in port 3000.");
});
