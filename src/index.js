import dirname from './consts.js'
import apiRouter from './api.js'
import homeRouter from './home.js'

import Express from 'express'
const app = Express()

app.use(Express.json())
app.use(Express.static(dirname + '/public'))
app.use('/api', apiRouter)
app.use('/', homeRouter)

app.listen(3000)