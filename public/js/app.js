// get query params
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
// this is running in the browser so 'socket' is available in the browser console !!
var socket = io();

// .text instead of .val!!
jQuery('.room-title').text(room);

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message) {
	var $messages = jQuery('.chatlog');
	var $message = jQuery("<li class='list-group-item'></li>");
	var $timestampMoment = moment.utc(message.timestamp);
	$message.append('<p><small><strong>' + $timestampMoment.local().format('h:mma') + ' '  + 
		message.name + '</strong>' +
		'  :  ' + message.text + '</small></p>');
	$messages.append($message);
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