// this is running in the browser so 'socket' is available in the browser console !!

var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	console.log('New message');
	console.log(message.text);
});
