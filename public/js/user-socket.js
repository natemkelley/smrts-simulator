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
      console.log('chat socket connected')
      chat.emit('hi!');
  });

  news.on('connect', function () {
      console.log('news socket connected')
      news.emit('woot');
  });
