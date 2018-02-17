const uuidv4 = require('uuid/v4')
const config = require('../config/config')


const sessions = new Map()
var counter = 0

function validateRoomName (roomname) {
  if (!roomname) return 'No room name specified!'
  if (roomname === '') return 'You need to enter a room name!'
  if (roomname.length > 20) return 'The room name is too long!'
  if (roomname.length <= 3) return 'The room name is too short!'
  return null
}

module.exports = {
  createSession (room) {
    var error = validateRoomName (room)

    if (error) {
      throw new Error(error)
    }

    let id = counter++
    const token = uuidv4()

    var session = {
      room,
      token,
      id
    }

    sessions.set(token, session)
    return session
  },
  getSession (token) {
    return sessions.get(token)
  },
  clearSession (token) {
    sessions.delete(token)
  }
}