const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    const data = JSON.parse(message);
    // Handle message based on type
    switch (data.type) {
      case 'keyPress':
        // Handle keypress
        break;
      case 'keyRelease':
        // Handle keyrelease
        break;
      default:
        console.log('Invalid message type');
    }
  });

  ws.send('Hello, client!');
});

server.on('error', (error) => {
  console.error('WebSocket server error:', error);
});