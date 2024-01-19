import OpenAI from 'openai'
const openai = new OpenAI()

import prompts from './prompts.js'
import notifyQuestion from './notify.js'

export default function questionManager(socket) {
  socket.on('question', async request => {
    let response = ''

    const question = request.question
    const personality = request.personality

    notifyQuestion(question, personality)

    const initialPrompt = prompts[personality] || prompts['default']

    try {
      const stream = await openai.chat.completions.create({
        messages: [{ role: 'user', content: initialPrompt + question }],
        model: 'gpt-3.5-turbo',
        stream: true
      })
  
      for await (const chunk of stream) {
        socket.emit('chunk', chunk.choices[0]?.delta?.content || '')
        response += chunk.choices[0]?.delta?.content || ''
      }

      socket.emit('end')
    } catch (err) {
      console.error(err)
      socket.emit('error', err)
    }
  })
}