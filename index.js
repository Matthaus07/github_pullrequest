const express = require('express');
const bodyParser = require("body-parser");

var routes = require('./src/api/routers/router');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

module.exports = app;

app.listen(process.env.PORT || 4000, function () {
    console.log('Server is running.. on Port 4000');
});