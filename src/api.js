import { config } from 'dotenv'
config()

import OpenAI from 'openai'
const openai = new OpenAI()

import Router from 'express'
const router = Router()

router.post('/request', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: req.body.question }],
      model: "gpt-3.5-turbo"
    })

    res.json(completion.choices[0])
  } catch (error) {
    res.json({ error: error.message })
  }
  

})

export default router