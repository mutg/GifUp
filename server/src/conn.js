
module.exports = (conn) => {
console.log(`client ${conn.id}`)

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

  conn.on('error', function(error) {
    console.log(`Error: ${error}`)
  })
}
