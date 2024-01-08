const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 8888;

// Set up a simple route for the master
app.get('/', (req, res) => {
  res.send('Master is running!');
});

// Handle connections from clients
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send a welcome message to the connected client
  socket.emit('message', 'Welcome, Client!');

  // Handle messages from the client
  socket.on('clientMessage', (message) => {
    console.log('Message from Client:', message);
  });

  // Handle disconnection of a client
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    io.emit('message', 'Client disconnected');
  });
});

// Start the server on the specified port
server.listen(PORT, () => {
  console.log(`Master is running at http://localhost:${PORT}`);
});
