//to use functions inside functions.js use functions.[testFunction](data);
var functions = require('../functions/functions');
var SocketIOFileUpload = require("socketio-file-upload");


module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('user socket connected');

        var uploader = new SocketIOFileUpload();
        uploader.listen(socket);

        socket.emit('message', {
            single: 'only this one socket will get this message',
        });
        chat.emit('message', {
            everyone: 'is getting this message',
        });

        socket.on('message', function (data) {
            console.log('client message', data)
        });
    })

    //To be used for entire socket.io
    /*io.on('connection', function (socket) {
        console.log('a socket is connected in socket.js');
        socket.on('disconnect', function () {
            io.emit('a socket disconnected');
        });
    });*/
}



/*********NOTES ON HOW TO USE THIS FILE******************/

//these are some resources to learn about socket.io
//https://socket.io/docs/rooms-and-namespaces/
//https://gist.github.com/crtr0/2896891
//https://socket.io/docs/emit-cheatsheet/

//this is how to use socket.io file uploader
//https://www.npmjs.com/package/socketio-file-upload
