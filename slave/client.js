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


const TOKEN = process.env.TOKEN;
const CLIENT_NAME = process.env.CLIENT_NAME;
const MASTER_NAME = process.env.MASTER_NAME;
const masterServerURL = process.env.SERVER_DIRECTORY_PORT;


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

socket.on('sleepCommand', ({ targetClient }) => {
  if (targetClient === CLIENT_NAME) {
    console.log(`Received sleep command from ${MASTER_NAME} for ${CLIENT_NAME}...`);
    executeSleepCommand();
  }
});

socket.on('restartCommand', ({ targetClient }) => {
  if (targetClient === CLIENT_NAME) {
    console.log(`Received restart command from ${MASTER_NAME} for ${CLIENT_NAME}...`);
    executeRestartCommand();
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

  // Shutdown command for Linux
  // exec('sudo shutdown -h now', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing shutdown command: ${error.message}`);
  //   } else {
  //     console.log('System is shutting down...');
  //   }
  // });
}

function executeSleepCommand() {
  console.log(`Executing sleep actions for ${CLIENT_NAME}...`);

  // Sleep command for Windows
  // exec('shutdown /h', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing sleep command: ${error.message}`);
  //   } else {
  //     console.log('System is going to sleep...');
  //   }
  // });

  // Sleep command for Linux
  // exec('sudo pm-suspend', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing sleep command: ${error.message}`);
  //   } else {
  //     console.log('System is going to sleep...');
  //   }
  // });
}

function executeRestartCommand() {
  console.log(`Executing restart actions for ${CLIENT_NAME}...`);

  // Restart command for Windows
  // exec('shutdown /r /t 0', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing restart command: ${error.message}`);
  //   } else {
  //     console.log('System is restarting...');
  //   }
  // });

  // Restart command for Linux
  // exec('sudo reboot', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing restart command: ${error.message}`);
  //   } else {
  //     console.log('System is restarting...');
  //   }
  // });
}
