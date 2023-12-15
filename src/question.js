import { config } from 'dotenv'
config()

import OpenAI from 'openai'
const openai = new OpenAI()

const initialPrompt = `Rispondi alla seguente domanda esprimendoti come se fossi il fantasma di un cavaliere medioevale.`

export default function questionManager(socket) {
  socket.on('question', async question => {
    console.log(`nuova domanda: ${question}`)
    try {
      const stream = await openai.chat.completions.create({
        messages: [{ role: 'user', content: initialPrompt + question }],
        model: 'gpt-3.5-turbo',
        stream: true
      })
  
      for await (const chunk of stream) {
        console.log(chunk.choices[0]?.delta?.content)
        socket.emit('chunk', chunk.choices[0]?.delta?.content || "")
      }
    } catch (err) {
      console.error(err)
      socket.emit('error', err)
    }
  })
}