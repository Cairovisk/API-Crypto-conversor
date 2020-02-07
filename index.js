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

  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/indices/global",
    methods: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }

  }

  request(options, function(error, response, body){
    var data = JSON.parse(body);
    var price = JSON.price;
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
