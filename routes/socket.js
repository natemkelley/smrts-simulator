var functions = require('../functions/functions');
var siofu = require("socketio-file-upload");
var fs = require('fs');
var colors = require('colors');

//establish a socket connection with the server
module.exports = function (io) {
    io.on('connection', function (socket) {
        var room = null;

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
            emitSendJoinRoom(io, room);
            emitSendTweet(io, room);
        });
        socket.on('create room', function (data) {
            console.log('creating room ->', data);
            room = data;
            emitCreateRoom(io, room);
            socket.join(data);
            emitSendJoinRoom(io, room);
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
        });
        uploader.on("error", function (event) {
            console.log("Error from uploader", event);
        });
    });

    module.exports.sendUploadStatus = function (status) {
        emitUploadStatus(io, status)
    }
}


function emitListOfSims(io) {
    console.log('emit list of sims');
    var returnValue = ["sim one", "sim two", "sim three"];
    io.emit('get list of sims', returnValue);
}

function emitSendTweet(io, room) {
    console.log('send tweet');

    var returnValue = functions.testTweetSimulation();
    io.to(room).emit('tweet', returnValue);
}

function emitSendJoinRoom(io, room) {
    console.log('emit join room');

    var returnValue = room;
    io.to(room).emit('join room', returnValue);
}

function resetTweets(io, room) {
    var returnValue = room;

    io.to(room).emit('reset tweet', returnValue);
}

function emitListOfRooms(io) {
    var returnValue = ["room one", "room two", "room three"];

    io.emit('get list of rooms', returnValue);
}

function emitCreateRoom(io, room) {
    io.emit('create room', room);
}

function emitUploadStatus(io, status) {
    io.emit('upload status', status);
}

/*********NOTES ON HOW TO USE THIS FILE******************/
//https://www.npmjs.com/package/socketio-file-upload
//https://socket.io/docs/emit-cheatsheet/
