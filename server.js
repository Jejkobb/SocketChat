var express = require('express');

var app = express();
var server = app.listen(5000);

app.use(express.static('public'));

console.log("My socket server is running!");

var socket = require('socket.io');

var io = socket(server);

io.on('connection', function(socket){
  console.log(socket.id + ' connected');

  socket.on('disconnect', function(){
    console.log(socket.id + ' disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
