var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var climb = require('./routes/climb');
var sublocation = require('./routes/sublocation');
var location = require('./routes/location');
var province = require('./routes/province');
var country = require('./routes/country');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);
app.use('/climb', climb);
app.use('/sublocation', sublocation);
app.use('/location', location);
app.use('/province', province);
app.use('/country', country);

module.exports = app;
