import TelegramBot from 'node-telegram-bot-api'
import { botToken, adminChatId } from './consts.js'

const bot = new TelegramBot(botToken, { polling: true })

export default function notifyQuestion(question, personality) {
  try {
    bot.sendMessage(adminChatId, `Nuova domanda: ${question}\n\nPersonalità: ${personality}`)
  } catch (err) {
    console.error(err)
  }
}

bot.on("polling_error", msg => console.error('Polling Error: ' + msg))