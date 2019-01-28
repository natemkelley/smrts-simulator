//server
var express = require('express');
var request = require('request');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var port = 3000;

//socket.io
var io = require('socket.io')(http);

//config
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//search .html files and send them
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static('public'))

//routes for api
var routes = require('./routes/api');
app.use('/api', routes);

//start server... use http for socket.io, 
//app.listen for normal http server
http.listen(port, function(){
    console.log('Server listening at port %d', port);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


module.exports = app;
