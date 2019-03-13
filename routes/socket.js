var functions = require('../functions/functions');
var database = require('../functions/database');
var siofu = require("socketio-file-upload");
var colors = require('colors');
var request = require("request");


//establish a socket connection with the server
module.exports = function (io) {
    //listener functions for the server
    var allRooms = [];

    io.on('connection', function (socket) {
        var room = null;

        //when someone is connected send these functions
        emitListOfSims(socket);
        emitListOfRooms(io, allRooms);

        console.log('\nuser socket connected');
        socket.on('get list of sims', function (data) {
            emitListOfSims(socket, room)
        });
        socket.on('get list of rooms', function (data) {
            emitListOfRooms(socket, allRooms)
        });
        socket.on('join room', function (data) {
            console.log('joining room ->', data);
            room = data;
            socket.join(data);
            emitConfirmJoinRoom(socket, room);
        });
        socket.on('create room', function (data, type) {
            console.log('creating room ->', data);
            room = pushNewRoomAndReturnName(data,type);
            emitCreateRoom(socket, room);
            emitListOfRooms(io, allRooms);
            socket.join(room);
            emitConfirmJoinRoom(socket, room);
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
        socket.on('click', function (data) {
            console.log('click', data);
            database.getSingleTwitterSimulation(data.nameOfSim)
                .then(results => {
                    console.log('emit results');
                    socket.emit('results', results);
                })
        });
        socket.on('delete all rooms', function () {
            removeAllRooms().then((status) => {
                emitListOfRooms(io, allRooms);
            });
        });
        socket.on('disconnect', function () {
            socket.leave(room, function () {
                console.log('socket leaving room');
                removeRoom(room).then((status) => {
                    emitListOfRooms(io, allRooms);
                });
            });
        });

        //uploader information
        //https://www.npmjs.com/package/socketio-file-upload#instanceprompt
        var uploader = new siofu();
        uploader.dir = "uploads";
        uploader.listen(socket);
        uploader.on("saved", function (event) {
            console.log(colors.green('saved'));
            functions.receiveUpload(event).then((status) => {
                sendUploadStatus(socket, status);
                emitListOfSims(socket);
            })
        });
        uploader.on("error", function (event) {
            console.log("Error from uploader", event);
        });

        //send test tweets
        var test = true;
        (function loop() {
            if (test) {
                var rand = Math.round(Math.floor(Math.random() * 10000) + 5000);
                setTimeout(function () {
                    var randomNumber = 1;
                    // console.log('send tweet');
                    var tweet = functions.testTweets(randomNumber);
                    emitSendTweet(io, room, tweet);
                    //emitListOfSims(socket)
                    loop();
                }, rand);
            }
        }());

    });

    //emit a list of uploaded simulation names
    function emitListOfSims(socket) {
        database.getAllTwitterSimulation().then((simArray) => {
            console.log('emit list of sims');
            socket.emit('get list of sims', simArray);
        });
    }

    //send an array of tweets to the room
    function emitSendTweet(io, room, tweet) {
        // console.log('send tweet');
        io.to(room).emit('tweet', tweet);
    }

    //confirm to user that a room has been joined
    function emitConfirmJoinRoom(socket, room) {
        console.log('emit join room', room);
        socket.emit('join room', room);
    }

    //reset front end after fast forward or rewind
    function resetTweets(io, room) {
        var returnValue = room;

        io.to(room).emit('reset tweet', returnValue);
    }

    //emit a list of rooms you can join
    function emitListOfRooms(io, allRooms) {
        io.emit('get list of rooms', allRooms);
    }

    //confirm to user that a room has been created
    function emitCreateRoom(socket, room) {
        socket.emit('create room', room);
    }

    //confirm to user whether the upload worked (status:true) or failed (status: false). 
    function emitUploadStatus(socket, status) {
        socket.emit('upload status', status);
    }

    //external use. send status to the user whether the upload worked. json containing problems with upload
    function sendUploadStatus(socket, status) {
        emitUploadStatus(socket, status);
    }

    function removeRoom(roomName) {
        return new Promise((resolve, reject) => {
            var returnVal = false;
            for (var index = 0; index < allRooms.length; ++index) {
                if(allRooms[index].name == roomName){
                    allRooms.splice(index, 1);
                    returnVal = true;
                }
            }
            resolve(returnVal)
        })
    }

    function removeAllRooms() {
        return new Promise((resolve, reject) => {
            allRooms = [];
            resolve(true)
        })
    }

    function pushNewRoomAndReturnName(data,type) {
        var orignalName = data;
        var duplicateName = null;
        var counter = 1;

        for (var index = 0; index < allRooms.length; ++index) {
            var room = allRooms[index];

            if (room.name == data || room.name == duplicateName) {
                data = orignalName + " (" + counter + ")";
                duplicateName = data;
                index = 0;
                counter++;
            }
        }

        allRooms.push({
            name: data,
            time: new Date(),
            type: type
        });
        return data
    }

}


/*Assume a usable simulation*/

/*********NOTES ON HOW TO USE THIS FILE******************/
//https://www.npmjs.com/package/socketio-file-upload
//https://socket.io/docs/emit-cheatsheet/
