function validateRoomName (roomname) {
  if (!roomname) return 'No room name specified!'
  if (roomname === '') return 'You need to enter a room name!'
  if (roomname.length > 20) return 'The room name is too long!'
  if (roomname.length <= 3) return 'The room name is too short!'
  return null
}

module.exports = (conn) => {
  console.log('client connected')

  conn.on('image-posted', function(url, cb) {
    console.log('client posted image')
    let data = {
      url,
      id: conn.id
    }

    if (conn.currentRoom) {
      conn.emit('image-posted', data)
      conn.to(conn.currentRoom).emit('image-posted', data)
      cb()
    }
  })

  conn.on('join-room', function (room, cb) {
    var error = validateRoomName(room)
    if(error === null) {
      conn.join(room, function() {
        conn.currentRoom = room
        console.log(`client joined room ${room}`)
        cb()
      })
    } else {
      cb(error)
    }
  })

  conn.on('leave-room', function (room, cb) {
    conn.leave(room, function () {
      console.log(`client left room ${room}`)
      conn.currentRoom = null
      cb()
    })
  })

  conn.on('disconnect', function (reason) {
    console.log('client disconnected')
  })
}
