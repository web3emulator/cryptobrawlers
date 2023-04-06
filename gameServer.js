const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 5500 })

const players = new Map()

server.on('connection', (socket) => {
  console.log('Client connected')

  // Generate a random player ID for the client
  const playerId = Math.random().toString(36).substr(2, 9)
  players.set(playerId, socket)

  // Send the player ID to the client
  socket.send(JSON.stringify({ type: 'playerId', playerId }))

  socket.on('message', (message) => {
    // Broadcast the message to all other clients
    players.forEach((clientSocket) => {
      if (clientSocket !== socket) {
        clientSocket.send(message)
      }
    })
  })

  socket.on('close', () => {
    console.log('Client disconnected')
    players.delete(playerId)
  })
})