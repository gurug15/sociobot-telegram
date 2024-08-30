import { Telegraf } from "telegraf";
import {message} from 'telegraf/filters'
import dotenv from 'dotenv'
import connectDB from './config/db'

import clear from "./commands/clear";
import generate from "./commands/generate";
import onMessage from "./message/message";
import start from "./commands/start";

dotenv.config();
const bot = new Telegraf(process.env.TELEGRAM_BOT_API || "")

try {
    connectDB();
    console.log("database connected succesfully")
} catch (error) {
    console.log("Connection error: ", error)
    process.kill(process.pid,'SIGTERM')
}


bot.start(start)

bot.command('generate', generate )

// bot.on(message('sticker'), (ctx)=>{
//     console.log("sticker: ", ctx.update.message)
// })

bot.command('clear',clear)

bot.on(message('text'),onMessage)
// bot.help((ctx)=> ctx.reply("send me a sticker"))
// bot.hears('hi',ctx=>ctx.reply("hey there"))
bot.launch();
// graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))