var functions = require('../functions/functions');
var database = require('../functions/database');
var siofu = require("socketio-file-upload");
var colors = require('colors');
var request = require("request");


//establish a socket connection with the server
module.exports = function (io) {
    //listener functions for the server
    io.on('connection', function (socket) {
        var room = null;

        //when someone is connected send these functions
        emitListOfSims(io);
        emitListOfRooms(io);

        console.log('\nuser socket connected');
        socket.on('get list of sims', function (data) {
            emitListOfSims(io, room)
        });
        socket.on('get list of rooms', function (data) {
            emitListOfRooms(io, room)
        });
        socket.on('join room', function (data) {
            console.log('joining room ->', data);
            room = data;
            socket.join(data);
            emitConfirmJoinRoom(io, room);
        });
        socket.on('create room', function (data) {
            console.log('creating room ->', data);
            room = data;
            emitCreateRoom(io, room);
            socket.join(data);
            emitConfirmJoinRoom(io, room);
        });
        socket.on('play', function (data) {
            console.log('play', data);
        });
        socket.on('pause', function (data) {
            console.log('pause', data);
        });
        socket.on('fast forward', function (data) {
            console.log('fast forward', data);
        });
        socket.on('rewind', function (data) {
            console.log('rewind', data);
        });
        socket.on('upload simulation', function (data) {
            functions.processUpload(data);
        });
        socket.on('disconnect', function () {
            socket.leave(room, function () {
                console.log('socket leaving room');
            });
        });

        //uploader information
        //https://www.npmjs.com/package/socketio-file-upload#instanceprompt
        var uploader = new siofu();
        uploader.dir = "uploads";
        uploader.listen(socket);
        uploader.on("saved", function (event) {
            console.log(colors.green('saved'));
            functions.receiveUpload(event)
        });
        uploader.on("error", function (event) {
            console.log("Error from uploader", event);
        });

        //send test tweets
        var test = true;
        (function loop() {
            if (true) {
                var rand = Math.round(Math.floor(Math.random() * 8000) + 3000);
                setTimeout(function () {
                    var randomNumber = 1;
                    var tweet = functions.testTweets(randomNumber);
                    emitSendTweet(io, room, tweet);
                    loop();
                }, rand);
            }
        }());

    });

    //emit a list of uploaded simulation names
    function emitListOfSims(io) {
        console.log('emit list of sims');
        database.getAllTwitterSimulation().then((simArray) => {
            io.emit('get list of sims', simArray);
        });
    }

    //send an array of tweets to the room
    function emitSendTweet(io, room, tweet) {
        console.log('send tweet');
        io.to(room).emit('tweet', tweet);
    }

    //confirm to user that a room has been joined
    function emitConfirmJoinRoom(io, room) {
        console.log('emit join room');

        var returnValue = room;
        io.to(room).emit('join room', returnValue);
    }

    //reset front end after fast forward or rewind
    function resetTweets(io, room) {
        var returnValue = room;

        io.to(room).emit('reset tweet', returnValue);
    }

    //emit a list of rooms you can join
    function emitListOfRooms(io) {
        var returnValue = ["room one", "room two", "room three"];

        io.emit('get list of rooms', returnValue);
    }

    //confirm to user that a room has been created
    function emitCreateRoom(io, room) {
        io.emit('create room', room);
    }

    //confirm to user whether the upload worked (status:true) or failed (status: false). 
    function emitUploadStatus(io, status) {
        io.emit('upload status', status);
    }

    //external use. send status to the user whether the upload worked. json containing problems with upload
    module.exports.sendUploadStatus = function (status) {
        emitUploadStatus(io, status)
    }
}


/*********NOTES ON HOW TO USE THIS FILE******************/
//https://www.npmjs.com/package/socketio-file-upload
//https://socket.io/docs/emit-cheatsheet/
