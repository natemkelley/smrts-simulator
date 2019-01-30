  var socket = io();
  /*socket.on('test', function (data) {
      console.log(data);
      socket.emit('client test', {
          from: 'client',
          msg: 'this is a great test'
      });
  });*/

  var chat = io('/chat');
  var news = io('/news');


  chat.on('connect', function () {
      console.log('chat socket connected');
      chat.emit('message', 'this is a message from the client');
      socket.emit('message', 'this socket is a message from the client');

      callAPI();
  });

  chat.on('message', function (data) {
      console.log(data);
  });

  news.on('connect', function () {
      console.log('news socket connected')
  });
