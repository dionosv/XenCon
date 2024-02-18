const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(rootDir, '.env') });

const PORT = 8888;
const MASTER_NAME = process.env.MASTER_NAME;
const TOKEN = process.env.TOKEN;

const connectedClients = [];

app.get('/', (req, res) => {
  res.send(`${MASTER_NAME} is running!`);
});

io.on('connection', (socket) => {
  const clientName = socket.handshake.headers['x-client-name'];
  const clientToken = socket.handshake.headers['x-client-token'];

  if (clientToken !== TOKEN) {
    console.log(`Unauthorized connection attempt from ${clientName}. Disconnecting...`);
    socket.disconnect(true); 
    return;
  }

  console.log(`${clientName} connected:`, socket.id);

  // Add the connected client to the array
  connectedClients.push(clientName);

  // Broadcast the list of connected clients to all clients
  io.emit('clientConnected', { clients: connectedClients });

  socket.emit('message', `Welcome, ${clientName}!`);

  // Give a shutdown command to the specific PC
  // socket.emit('shutdownCommand', { targetClient: 'XENHACKPC1' });

  socket.emit('sleepCommand', { targetClient: 'XENHACKPC2' });

  // socket.emit('restartCommand', { targetClient: 'XENHACKPC1' });

  socket.on('clientMessage', (message) => {
    console.log(`Message from ${clientName}:`, message);
  });

  socket.on('disconnect', () => {
    console.log(`${clientName} disconnected:`, socket.id);

    // Remove the disconnected client from the array
    const index = connectedClients.indexOf(clientName);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }

    io.emit('message', `${clientName} disconnected`);

    // Broadcast the updated list of connected clients to all clients
    io.emit('clientConnected', { clients: connectedClients });

  });
});

server.listen(PORT, () => {
  console.log(`${MASTER_NAME} is running at http://localhost:${PORT}`);
});
