# Xenhack Connection

A networked system that facilitates communication and control between a master server and multiple slave a.k.a client devices.

# First Setup 
Step to develop code from your computer:

## Step 1: Clone the Repository

Clone the XenCon repository from GitHub using the following command:

```bash
git clone https://github.com/dionosv/XenCon.git
```

## Step 2: .env

Copy env file setup on your project (modify the client name)

## Step 3: Open Terminals

Open two different terminals to run the master and slave servers concurrently.

### Terminal 1 - Master

1. Navigate to the master directory:

```bash
cd XenCon/master
```

2. Start server:

```bash
node master.js
```

### Terminal 2 - Slave

1. Navigate to the slave directory:

```bash
cd XenCon/slave
```

2. Connect client to master server:

```bash
#windows
$env:TOKEN="server-token" 
node client.js

#linux
export TOKEN=server-token
node client.js
```

Now you have both the master and slave servers up and running.