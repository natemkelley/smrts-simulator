//https://socket.io/docs/#Using-with-Express
//https://socket.io/docs/rooms-and-namespaces/
//https://gist.github.com/crtr0/2896891

exports = module.exports = function (io) {
    var chat = io
        .of('/chat')
        .on('connection', function (socket) {
            console.log('user socket connected')
            socket.emit('message', {
                single: 'only this one socket will get this message',
            });
            chat.emit('message', {
                everyone: 'is getting this message',
            });
            
            socket.on('message', function (data) {
                console.log('client message', data)
            })
        })



    var news = io
        .of('/news')
        .on('connection', function (socket) {
            console.log('news socket connected')
        });






    /*io.on('connection', function (socket) {
        console.log('a socket is connected in socket.js');
        socket.on('disconnect', function () {
            io.emit('a socket disconnected');
        });
    });*/
}
