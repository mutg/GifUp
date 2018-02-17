const EventEmitter = require('events').EventEmitter

export default class Socket extends EventEmitter {

  constructor(token) {
    super()
    this.token = token
    this.socket = new WebSocket(`ws://localhost:3000?token=${token}`)

    this.socket.addEventListener('open', (event) => {
      // socket.send('Hello servesr!')
    })
    
    this.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data)
      this.emit('message', JSON.parse(event.data))
    })

    this.socket.addEventListener('close', (event) => {
      this.emit('close', event.data)
    })

    this.socket.addEventListener('error', (event) => {
      this.emit('error', event.data)
    })

  }

  send (data) {
    let msgObject = JSON.stringify({
      data: data
    })
    this.socket.send(msgObject)
  }

  close () {
    this.socket.close()
  }

}