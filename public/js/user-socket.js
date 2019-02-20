var socket = io();
var room = "default room";

/*UPLOADER*/
var uploader = new SocketIOFileUpload(socket);
uploader.listenOnInput(document.getElementById("siofu_input"));
uploader.addEventListener("progress", function (event) {
    var percent = event.bytesLoaded / event.file.size * 100;
    console.log("File is", percent.toFixed(2), "percent loaded");
});
uploader.addEventListener("complete", function (event) {
    console.log(event.success);
    console.log(event.file);
});

/************LISTENER FUNCTIONS FOR SOCKET.IO*********/
socket.on('connect', function () {
    console.log('socket connected');

    socket.on('get list of sims', function (data) {
        console.log('get list of sims')
        console.log(data)
    });

    socket.on('tweet', function (data) {
        console.log('tweet')
        console.log(data)
    });

    socket.on('reset tweets', function (data) {
        console.log('reset tweets')
        console.log(data)
    });

    socket.on('join room', function (data) {
        console.log('joining room', data)
    });

    socket.on('create room', function (data) {
        console.log('room has been created', data)
    });

    socket.on('upload status', function (data) {
        console.log(data)
    });

    socket.on('get list of rooms', function (data) {
        console.log('get list of rooms')
        console.log(data)
    });

    emitGetListofSims();
    emitGetListofRooms();
    requestJoinRoom();
    requestCreateRoom();
});


/************EMIT FUNCTIONS FOR SOCKET.IO*********/
function emitGetListofSims() {
    socket.emit('get list of sims', 'i want a list of sims');
}

function emitGetListofRooms() {
    socket.emit('get list of rooms', 'i want a list of rooms');
}

function requestJoinRoom() {
    var roomName = "default room";
    console.log('request to join room', roomName)
    socket.emit('join room', roomName);
}

function requestCreateRoom() {
    var roomName = "new room";
    console.log('creating room', roomName)
    socket.emit('create room', roomName);
}

function playSimulation() {
    socket.emit('play', true);
}

function pauseSimulation() {
    socket.emit('pause', true);
}

function ffSimulation() {
    socket.emit('fast forward', true);
}

function rwSimulation() {
    socket.emit('rewind', true);
}

function uploadSimulation(simulation) {
    socket.emit('upload simulation', simulation);
}
