var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var auth = require('http-auth');
var basic = auth.basic({
  realm: 'Secret Chat'}, function (username, password, callback) {
    callback(true);
  });

// 3. setup streamable and make it aware of our socket.io server instance.
var streamable = require('streamable').streamable(io);

app.all('/messages/*', auth.connect(basic));

// This is a poor man solution to save the user name of the Basic Auth.
// Don't use this in production code.
var logins = {};

setInterval(function () {
  console.log('socket.io Heartbeat...');

  io.emit('chat message', 'Heartbeat');
}, 15 * 1000);

app.get('/', function(req, res) {
  // Store authenticated username in lookup map
  logins[req.headers.authorization] = req.user;

  res.sendFile('index.html', {'root': './'});
});

app.get('/infoclient-resteasy/rest/settings', function(req, res) {
  // Store authenticated username in lookup map
  logins[req.headers.authorization] = req.user;
  console.log('settings for user', req.user);
  res.sendFile('settings.json', {'root': './'});
});

app.get('/messages/stream', streamable, function(req, res) {
  console.log('GET /messages/stream for user', req.user);
  var inter, counter = 30;
  inter = setInterval(function() {
    var message = 'Hello World ' + counter;
    console.log('stream message >>', message, '<< for user', req.user);
    res.write([{
      'severity': 6,
      'title': 'Title text',
      'body': message,
      'time': new Date().toString()
    }], 'json');
    if (--counter == 0) {
      clearInterval(inter);
      res.end();
    }
  }, 5000);
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
