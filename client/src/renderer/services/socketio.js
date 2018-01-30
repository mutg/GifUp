import io from 'socket.io-client'
const socket = io('http://localhost:3000',
  {
    autoConnect: false
  }
)

console.log('socket io running')

export default socket