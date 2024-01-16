import { dirname } from './consts.js'

import Router from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.sendFile(dirname + '/public/index.html')
})

export default router