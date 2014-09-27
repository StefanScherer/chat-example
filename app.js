var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
//  res.send('<h1>Hello world</h1>');
  res.sendFile('index.html', {'root': './'});
});

io.on('connection', function(socket) {
  socket.broadcast.emit('hi');
  console.log('a user connected');

  socket.on('disconnect', function () {
  	console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
  	io.emit('chat message', msg);
  	console.log('message: ', msg);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
