(function () {
    var socket = io();
    var room = "default room";

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
            console.log('join room')
            console.log(data)
        });

        socket.on('get list of rooms', function (data) {
            console.log('get list of rooms')
            console.log(data)
        });


        getListofSims();
        joinRoom();
        createRoom();
    });


    /************EMIT FUNCTIONS FOR SOCKET.IO*********/
    function getListofSims() {
        socket.emit('get list of sims', 'i want a list of sims');
    }

    function joinRoom() {
        var roomName = "default room";
        socket.emit('join room', roomName);
    }

    function createRoom() {
        var roomName = "new room";
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









})()
