//to use functions inside functions.js use functions.[testFunction](data);
var functions = require('../functions/functions');

//these are some resources to learn about socket.io
//https://socket.io/docs/rooms-and-namespaces/
//https://gist.github.com/crtr0/2896891
//https://socket.io/docs/emit-cheatsheet/

module.exports = function (io) {
    var chat = io.of('/chat');
    var news = io.of('/news')


    chat.on('connection', function (socket) {
        console.log('user socket connected')
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


    news.on('connection', function (socket) {
        console.log('news socket connected')
    });


    //To be used for entire socket.io
    /*io.on('connection', function (socket) {
        console.log('a socket is connected in socket.js');
        socket.on('disconnect', function () {
            io.emit('a socket disconnected');
        });
    });*/
}
