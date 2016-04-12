// this is running in the browser so 'socket' is available in the browser console !!

var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	console.log('New message');
	console.log(message.text);
});

// form handler
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]').val();
	socket.emit('message', {
		text: $message.val();
	});

	$message.val('');
});