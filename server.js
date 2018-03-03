var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// var favicon = require('serve-favicon');
var path = require('path');



var PORT = process.env.PORT || 3000;

// Node.js middleware for serving a favicon.
// app.use(favicon(path.join(__dirname, 'app/public/assets/images', 'friendsFavicon.ico')));

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({
    type: 'application/*+json'
}));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({
    type: 'application/vnd.custom-type'
}));

// parse an HTML body into a string
app.use(bodyParser.text({
    type: 'text/html'
}));

// Expose the public directory to access CSS files
app.use(express.static(path.join(__dirname, './app/public')));

// router
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);



app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});