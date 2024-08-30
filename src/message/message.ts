import event from "../models/event"

const onMessage = async (ctx:any)=>{
    
    const from  = ctx.update.message.from
    const message = ctx.update.message.text
    console.log(message)
    try {
        
        await event.create({
            text: message,
            tgId: from.id
        })
        await ctx.reply("Noted 👍, keep texting me yout thoughts. TO generate the posts just enter the command: /generate")
    } catch (error) {
        console.log(error)
        await ctx.reply("Facing difficulties, Try again later.")
    }
}



export default onMessage;