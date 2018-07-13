// server.js
const WebSocket = require('ws')
const express = require('express');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client, index) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data))
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  let numberOfUsers = {
    type: 'connectedUser',
    numberOfUsers: wss.clients.size
  }

  wss.broadcast(numberOfUsers);
  ws.on('message', function incoming(data) {
    const dataObj = JSON.parse(data);
    switch(dataObj.type) {
      case 'postMessage':
        dataObj.id = uuidv1();
        dataObj.type = 'incomingMessage'
        wss.broadcast(dataObj);
        break;
      case 'postNotification':
        dataObj.id = uuidv1();
        dataObj.type = 'incomingNotification'
        wss.broadcast(dataObj);
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
  console.log('Client disconnected');
  numberOfUsers.numberOfUsers = wss.clients.size;
  wss.broadcast(numberOfUsers);
  })
});