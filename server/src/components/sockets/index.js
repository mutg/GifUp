const sessions = require('../sessions')
const WebSocket = require('ws')
const url = require('url')

module.exports = (server) => {
  const wss = new WebSocket.Server({ server })
  wss.on ('connection', (ws, req) => {
    const location = url.parse(req.url, true)
    const token = location.query.token
    let session = sessions.getSession(token)
    if (session) {
      ws.session = session
      ws.on('message', function(message) {
        console.log('received message')
        try {
          let messageObject = JSON.parse(message)
          messageObject.from = ws.session.id

          wss.clients.forEach(function (client) {
            if (client.readyState === WebSocket.OPEN && client.session.room === ws.session.room) {
              client.send(JSON.stringify(messageObject))
            }
          })
        } catch (error) {
          console.log(`error on message received = ${error}`)
        }

      })
      ws.on('close', function() {
        if (ws.session.token) {
          sessions.clearSession(ws.session.token)
        }
        console.log('disconnected')
      })
      ws.on('error', function(error) {
        console.log(error)
      })
    } else {
      console.log('Invalid token! closing socket')
      ws.close(1008, 'Token not valid')
    }

  })
  
}