const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', function () {
  
})

server.listen(3000)
console.log('server listening...')