import { config } from 'dotenv' 
config()

import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const botToken = process.env.BOT_TOKEN
const adminChatId = process.env.ADMIN_CHAT_ID

export { dirname, botToken, adminChatId }