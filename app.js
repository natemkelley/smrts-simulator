//server
var express = require('express');
var request = require('request');
var path = require('path');
var app = express();
const server = require('http').Server(app);
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var port = 3000;



// mongoose connection
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/smrts');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connected to mongodb");
    var Tweet = mongoose.model('Tweet',
        new Schema({
            date: Date,
            id: String,
            rtc: Number,
            text: String
        }),
        'twitter'); // collection name
    Tweet.find({}, function (err, data) {
        console.log('loaded data using mongoose successfully');
        //   console.log(err, data, data.length);
    });
});




//config for json use
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//socket.io
var io = require('socket.io')(server);
var SocketIOFileUpload = require("socketio-file-upload");
app.use(SocketIOFileUpload.router)
var socket = require('./routes/socket')(io);


//routes for api
var routes = require('./routes/api');
app.use('/api', routes);

//.html files from public will be sent on root
app.use('/', express.static('public'))

//set render engine as html
app.set('view engine', 'html');

//start server on specified port
server.listen(port, function () {
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
