// dependencies.
var express = require('express');
var bodyParser = require('body-parser');

// initialize 
var app = express();

// PORT 
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/app/public'));

// Import routes.
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Start listening.
app.listen(PORT, '0.0.0.0');