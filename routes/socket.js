//https://socket.io/docs/#Using-with-Express
//https://socket.io/docs/rooms-and-namespaces/

exports = module.exports = function (io) {
    /*io.on('connection', function (socket) {
        console.log('a socket is connected in socket.js');
        socket.on('disconnect', function () {
            io.emit('a socket disconnected');
        });
    });*/

    var chat = io
        .of('/chat')
        .on('connection', function (socket) {
            console.log('chat socket connected')
            socket.emit('a message', {
                that: 'only',
                '/chat': 'will get'
            });
            chat.emit('a message', {
                everyone: 'in',
                '/chat': 'will get'
            });
        });

    var news = io
        .of('/news')
        .on('connection', function (socket) {
            console.log('news socket connected')

            socket.emit('item', {
                news: 'item'
            });
        });

}
