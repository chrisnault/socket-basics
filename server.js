var PORT = process.env.PORT || 3000;
var express = require('express');
var moment = require('moment');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.use(express.static(__dirname + "/public"));

var clientInfo = {};

io.on('connection', function(socket) {
	console.log("User connected via socket.io");

	socket.on('disconnect', function() {
		console.log('user is leaving');
		var userData = clientInfo[socket.id];
		if (typeof userData !== 'undefined') {
			console.log(userData.name);
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left',
				timestamp: moment.valueOf()
			});
			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment.valueOf()
		});
	});

	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);
		// io.emit sends to everone includeing the sender
		// socket.broadcast.emit goes to everyone but the sender
		// socket.broadcast.emit('message', message);
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message); //HERE
	});

	
	socket.emit('message', {
		text: 'Welcome to chat',
		name: 'System',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function () {
	var now = moment();
	console.log(now.format() + ' - Server Started on port ' + PORT);
})
