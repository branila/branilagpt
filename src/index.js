import { dirname } from './consts.js'
import questionManager from './question.js'
import homeRouter from './home.js'

import { createServer } from 'http'
import { Server } from 'socket.io'
import Express from 'express'

const app = Express()
const server = createServer(app)
const io = new Server(server)

app.use(Express.static(dirname + '/public'))
app.use('/', homeRouter)
io.on('connection', socket => questionManager(socket))

server.listen(3000)