// this is running in the browser so 'socket' is available in the browser console !!

var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	// console.log('New message');
	// console.log(message.text);
	var $timestampMoment = moment.utc(message.time);
	jQuery('.chatlog')
		.append('<br>' + $timestampMoment.local().format('h:mm a') + ' : ' + message.text);
	
});

// form handler
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	
	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
	
});