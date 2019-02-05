var SocketIOFileUpload = require("socketio-file-upload");

module.exports = function (io) {
    var uploader = new SocketIOFileUpload();

    io.on('connection', function (socket) {
        var room = null;

        console.log('user socket connected');
        uploader.listen(socket);

        socket.on('get list of sims', function (data) {
            emitListOfSims(io, room)
        });
        socket.on('join room', function (data) {
            console.log('joining room ->', data);
            room = data;
            socket.join(data);
            emitSendJoinRoom(io, room);
        });
        socket.on('create room', function (data) {
            console.log('creating room ->', data);
            room = data;
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
        console.log('disconnect');
        socket.leave(room);
    });
}




function emitListOfSims(io) {
    console.log('emit list of sims');
    var returnValue = ["sim one", "sim two", "sim three"];
    io.emit('get list of sims', returnValue);
}

function emitSendTweet(io, room) {
    console.log('send tweet');

    var returnValue = "list of tweets";
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


/*********NOTES ON HOW TO USE THIS FILE******************/
//https://www.npmjs.com/package/socketio-file-upload
//https://socket.io/docs/emit-cheatsheet/
