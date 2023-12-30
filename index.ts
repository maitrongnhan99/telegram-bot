import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

const token = process.env.TELEGRAM_TOKEN || ''

const bot = new TelegramBot(token, { polling: true })
//
// bot.onText(/\/echo (.+)/, (msg, match) => {
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
//
//     const chatId = msg.chat.id
//     // const resp = match[1] // the captured "whatever"
//
//     // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, 'hihi')
// })
//
// // Listen for any kind of message. There are different kinds of
// // messages.
//
const chatId = '@maitrongnhan'

bot.sendMessage(chatId, 'Hello world')

// bot.sendPhoto(
//     chatId,
//     'https://cdn.mos.cms.futurecdn.net/i26qpaxZhVC28XRTJWafQS-1200-80.jpeg'
// )

const app = express()
app.use(express.json())

app.post(`/bot${token}`, (req: any, res: any) => {
    console.log('Received a request', req)
    bot.processUpdate(req.body)
    res.sendStatus(200)
})

app.listen(8000, () => {
    console.log(`Express server is listening on ${8000}`)
})

const PUBLIC_URL = 'https://238c-171-243-49-201.ngrok-free.app'

bot.setWebHook(`${PUBLIC_URL}/bot${token}`, {
    certificate: 'cert.pem',
}).then((res) => {
    console.log('Set webhook result', res)
})

bot.on('message', (msg) => {
    const chatId = msg.chat.id
    console.log('Received message', msg)
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message')
})

bot.on('polling_error', (error) => {
    console.log('Polling error', error)
})

bot.on('webhook_error', (error) => {
    console.log('Webhook error', error)
})
