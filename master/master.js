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
const CLIENT_NAME = process.env.CLIENT_NAME;

app.get('/', (req, res) => {
  res.send(`${MASTER_NAME} is running!`);
});

io.on('connection', (socket) => {
  console.log(`${CLIENT_NAME} connected:`, socket.id);

  socket.emit('message', `Welcome, ${CLIENT_NAME}!`);

  socket.on('clientMessage', (message) => {
    console.log(`Message from ${CLIENT_NAME}:`, message);
  });

  // give command shutdown to specific PC
  socket.emit('shutdownCommand', { targetClient: 'XENHACKPC1' });

  socket.on('disconnect', () => {
    console.log(`${CLIENT_NAME} disconnected:`, socket.id);
    io.emit('message', `${CLIENT_NAME} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`${MASTER_NAME} is running at http://localhost:${PORT}`);
});