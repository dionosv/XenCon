const io = require('socket.io-client');
const dotenv = require('dotenv');
const path = require('path');
const { exec } = require('child_process');

// Configure .env
const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(rootDir, '.env') });

// For development, please uncomment this code below
// const masterServerURL = 'http://localhost:8888/';

// Otherwise, uncomment this code below
const masterServerURL = 'http://51.20.187.111:8888/';


const TOKEN = process.env.TOKEN;
const CLIENT_NAME = process.env.CLIENT_NAME;
const MASTER_NAME = process.env.MASTER_NAME;

// Connect to the master server
const socket = io.connect(masterServerURL, {
  transportOptions: {
    polling: {
      extraHeaders: {
        'x-client-name': CLIENT_NAME,
        'x-client-token': TOKEN,
      },
    },
  },
});

socket.on('connect', () => {
  console.log(`${CLIENT_NAME} connected:`, socket.id);
  socket.emit('clientMessage', `Hello ${MASTER_NAME}!`);
});

socket.on('clientConnected', ({ clients }) => {
  console.log(`Connected Clients: ${clients.join(', ')}`);
});

socket.on('message', (message) => {
  console.log(`Message from ${MASTER_NAME}:`, message);
});

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

  // Mock shutdown function
  console.log(`Mock shutdown successful for ${CLIENT_NAME}...`);
  // In a real scenario, you can replace this with the actual shutdown command
  // exec('shutdown /s /t 0', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing shutdown command: ${error.message}`);
  //   } else {
  //     console.log('System is shutting down...');
  //   }
  // });
}
