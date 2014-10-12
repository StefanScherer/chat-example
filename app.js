var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var auth = require('http-auth');
var basic = auth.basic({
    realm: 'Secret Chat',
    file: __dirname + "/data/users.htpasswd" // testuser:testpass, ...
});

app.use(auth.connect(basic));

// This is a poor man solution to save the user name of the Basic Auth.
// Don't use this in production code.
var logins = {};

app.get('/', function(req, res) {
  // Store authenticated username in lookup map
  logins[req.headers.authorization] = req.user;

  res.sendFile('index.html', {'root': './'});
});

io.on('connection', function(socket) {
  socket.broadcast.emit('hi');
  // Store username from Express lookup map
  // Does not work if server was restarted and Browser reconnects, then logins is empty.
  socket.user = logins[socket.handshake.headers.authorization];

  console.log('user', socket.user, 'connected');
  socket.on('disconnect', function () {
  	console.log('user', socket.user, 'disconnected');
  });

  socket.on('chat message', function(msg) {
    var message = socket.user + ': ' + msg;
  	io.emit('chat message', message);
  	console.log(message);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
