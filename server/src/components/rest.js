const sessions = require('./sessions')

module.exports = (app) => {
  app.post('/join', (req, res) => {
    let room = req.body.room

    try {
      var session = sessions.createSession(room)
      res.status(200).send({
        session
       })
    } catch (error) {
      res.status(400).send({
        error: error.message
      })
    }
  })
}
