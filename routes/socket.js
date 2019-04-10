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
        let movedSomething = false;
        let position = 0;

        console.log(colors.cyan(socket.id));

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
            console.log('joining room as ' + room);
            socket.join(data);
            emitConfirmJoinRoom(socket, room);
        });
        socket.on('create room', function (data, type) {
            console.log('creating room ->', data);
            room = pushNewRoomAndReturnName(data, type, socket.id);
            console.log('creating room as ' + room);

            emitCreateRoom(socket, room, data);
            emitListOfRooms(io, allRooms);
            socket.join(room);
            emitConfirmJoinRoom(socket, room, data);
        });
        socket.on('play', function (data) {
            let playpauseroom = data
            togglePlayPauseRoom(playpauseroom)

            //TODO:Call loop from here we need room and tweets, position is global
        });
        socket.on('pause', function (data) {
            let playpauseroom = data
            togglePlayPauseRoom(playpauseroom)
        });
        socket.on('fast forward', function (data) {
            console.log('fast forward', data);
            movedSomething = true;
        });
        socket.on('rewind', function (data) {
            console.log('rewind', data);
            movedSomething = true;
        });
        socket.on('click', function (data) {
            console.log('click', data);
        });
        socket.on('delete all rooms', function () {
            removeAllRooms().then((status) => {
                emitListOfRooms(io, allRooms);
            });
        });
        socket.on('disconnect', function () {
            console.log('socket leaving room');
            removeRoom(room, socket.id).then((status) => {
                emitListOfRooms(io, allRooms);
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

        function loop(tweets, room, position) {
            if (position < tweets.length - 1) {
                let rand = Math.round(Math.floor(Math.random() * 7000) + 1000);
                setTimeout(function () {
                    let tweet = tweets[position];
                    let paused = getPaused(room);
                    let roomExists = getRoomExists(room);

                    console.log('looping', room, 'with a paused of', paused, 'at the pos', position);

                    if ((!movedSomething && !paused) && roomExists) {
                        emitSendTweet(io, room, tweet);
                        loop(tweets, room, ++position);
                    } else if (roomExists) {
                        loop(tweets, room, position)
                    } else {
                        console.log(colors.red('No room found. Ending Loop.'));
                        sendSessionEndStatusToRemainingRooms(io, room)
                    }
                }, rand);
            }
        }

        function getRoomExists(roomName) {
            let roomExists = false
            allRooms.forEach(function (roomLoop) {
                if (roomLoop.name == room) {
                    roomExists = true
                }
            })

            return roomExists
        }

        function getPaused(roomName) {
            let returnStatus = false;
            for (var index = 0; index < allRooms.length; ++index) {
                if (allRooms[index].name == roomName) {
                    returnStatus = allRooms[index].paused
                }
            }

            return returnStatus
        }

        //confirm to user that a room has been joined
        function emitConfirmJoinRoom(socket, room, simName) {
            console.log('emit join room', room);
            socket.emit('join room', room);
        }

        //reset front end after fast forward or rewind
        function resetTweets(io, room) {
            var returnValue = room;

            io.to(room).emit('reset tweet', returnValue);
        }

        function sendMaxTweets(io, room, tweets) {
            io.to(room).emit('max tweets', tweets[0].simulation.length);
        }

        //emit a list of rooms you can join
        function emitListOfRooms(io, allRooms) {
            io.emit('get list of rooms', allRooms);
        }

        //confirm to user that a room has been created
        function emitCreateRoom(socket, room, nameOfSim) {
            socket.emit('create room', room);
            database.getSingleTwitterSimulation(nameOfSim)
                .then(results => {
                    // console.log('results', results);
                    // socket.emit('results', results);
                    loop(results[0].simulation, room, position);
                    sendMaxTweets(io, room, results);
                })
        }

        //confirm to user whether the upload worked (status:true) or failed (status: false).
        function emitUploadStatus(socket, status) {
            socket.emit('upload status', status);
        }

        //external use. send status to the user whether the upload worked. json containing problems with upload
        function sendUploadStatus(socket, status) {
            emitUploadStatus(socket, status);
        }

        function removeRoom(roomName, socketID) {
            return new Promise((resolve, reject) => {
                var returnVal = false;

                for (var index = 0; index < allRooms.length; ++index) {
                    if ((allRooms[index].name == roomName) && (allRooms[index]).socketID == socketID) {
                        console.log(colors.yellow('removing room ' + roomName));
                        allRooms.splice(index, 1);
                        returnVal = true;
                    }
                }
                resolve(returnVal)
            })
        }

        function togglePlayPauseRoom(roomName) {
            for (var index = 0; index < allRooms.length; ++index) {
                if (allRooms[index].name == roomName) {
                    allRooms[index].paused = !allRooms[index].paused;
                }
            }
        }

        function removeAllRooms() {
            return new Promise((resolve, reject) => {
                allRooms = [];
                resolve(true)
            })
        }

        function pushNewRoomAndReturnName(data, type, socketID) {
            var orignalName = data;
            var duplicateName = null;
            var counter = 1;

            for (var index = 0; index < allRooms.length; ++index) {
                let room2 = allRooms[index];

                if (room2.name == data || room2.name == duplicateName) {
                    data = orignalName + " (" + counter + ")";
                    duplicateName = data;
                    index = 0;
                    counter++;
                }
            }

            console.log(colors.cyan(socketID))
            allRooms.push({
                name: data,
                time: new Date(),
                type: type,
                paused: false,
                socketID: socketID
            });
            return data
        }

        function sendSessionEndStatusToRemainingRooms(io, roomName) {
            console.log(colors.red('informing users of session end'))
            io.to(roomName).emit('session ended', true);
        }

    });

};


/*********NOTES ON HOW TO USE THIS FILE******************/
//https://www.npmjs.com/package/socketio-file-upload
//https://socket.io/docs/emit-cheatsheet/
