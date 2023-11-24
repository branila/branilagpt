import dirname from './consts.js'

import Router from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.sendFile(dirname + '/public/pages/index.html')
})

export default router