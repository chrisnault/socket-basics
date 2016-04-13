// get query params
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
// this is running in the browser so 'socket' is available in the browser console !!
var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	var $message = jQuery('.chatlog');
	var $timestampMoment = moment.utc(message.timestamp);
	$message.append('<p><small><strong>' + message.name + ' '  + 
		$timestampMoment.local().format('h:mm a') + '</strong>' +
		'  >>>  ' + message.text + '</small></p>');
});

// form handler
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	
	socket.emit('message', {
		text: $message.val(),
		name: name
	});

	$message.val('');
	
});