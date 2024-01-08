const io = require('socket.io-client');

// Replace the URL with the actual master server URL
const masterServerURL = 'http://51.20.187.111:8888/';
const socket = io.connect(masterServerURL);

// Handle the connection event
socket.on('connect', () => {
  console.log('Client connected:', socket.id);

  // Send a message to the master upon connection
  socket.emit('clientMessage', 'Hello Master!');

  // Handle messages from the master
  socket.on('message', (message) => {
    console.log('Message from Master:', message);
  });
});

// Handle the connection error event
socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);

  if (error.message === 'xhr poll error' || error.message === 'polling error') {
    console.log(`Unable to connect to ${masterServerURL}. Make sure the Master server is running.`);
  }
});

// Handle disconnection event
socket.on('disconnect', () => {
  console.log('Client disconnected');
});