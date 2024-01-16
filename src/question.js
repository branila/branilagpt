import { config } from 'dotenv'
config()

import OpenAI from 'openai'
const openai = new OpenAI()

import prompts from './prompts.js'

export default function questionManager(socket) {
  socket.on('question', async request => {
    const question = request.question
    const personality = request.personality

    const initialPrompt = prompts[personality] || prompts['default']

    try {
      const stream = await openai.chat.completions.create({
        messages: [{ role: 'user', content: initialPrompt + question }],
        model: 'gpt-3.5-turbo',
        stream: true
      })
  
      for await (const chunk of stream) {
        socket.emit('chunk', chunk.choices[0]?.delta?.content || "")
      }
    } catch (err) {
      console.error(err)
      socket.emit('error', err)
    }
  })
}