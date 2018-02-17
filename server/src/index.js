const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').createServer(app)
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())


require('./components/sockets')(server)
require('./components/rest')(app)

server.listen(3000)
console.log('server listening...')
