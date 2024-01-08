const io = require('socket.io-client');
const dotenv = require('dotenv');
const path = require('path');
const { exec } = require('child_process');

// configure .env
const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(rootDir, '.env') });

// for development, please uncomment this code below
// const masterServerURL = 'http://localhost:8888/';

// otherwise ,uncomment this code below
const masterServerURL = 'http://51.20.187.111:8888/';

const socket = io.connect(masterServerURL);

const CLIENT_NAME = process.env.CLIENT_NAME;
const MASTER_NAME = process.env.MASTER_NAME;

socket.on('connect', () => {
  console.log(`${CLIENT_NAME} connected:`, socket.id);
  socket.emit('clientMessage', `Hello ${MASTER_NAME}!`);

  // Send the client name to the server
  socket.emit('setClientName', CLIENT_NAME);
});

// Listen for the broadcasted client name from master
socket.on('clientConnected', ({ clientName }) => {
  console.log(`Client connected: ${clientName}`);
});

socket.on('message', (message) => {
  console.log(`Message from ${MASTER_NAME}:`, message);
});z

socket.on('shutdownCommand', ({ targetClient }) => {
  if (targetClient === CLIENT_NAME) {
    console.log(`Received shutdown command from ${MASTER_NAME} for ${CLIENT_NAME}...`);
    executeShutdownCommand();
  }
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);

  if (error.message === 'xhr poll error' || error.message === 'polling error') {
    console.log(`Unable to connect to ${masterServerURL}. Make sure the Master server is running.`);
  }
});

socket.on('disconnect', () => {
  console.log(`${CLIENT_NAME} disconnected`);
});

function executeShutdownCommand() {
  console.log(`Executing shutdown actions for ${CLIENT_NAME}...`);

  mockShutdownFunction() 

  // RIIL MATI IKI
  // exec('shutdown /s /t 0', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing shutdown command: ${error.message}`);
  //   } else {
  //     console.log('System is shutting down...');
  //   }
  // });
}

function mockShutdownFunction() {
  console.log(`Mock shutdown function called for ${CLIENT_NAME}...`);
  console.log(`Mock shutdown successful for ${CLIENT_NAME}...`);
}