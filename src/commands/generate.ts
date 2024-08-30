import { GoogleGenerativeAI } from "@google/generative-ai";
import event from "../models/event";
import user from "../models/user";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');


const generate = async (ctx:any)=>{
    const from = ctx.update.message.from;
    const {message_id: LoadstickerId} = await ctx.replyWithSticker('CAACAgEAAxkBAANVZs8cCn5JAgigsn3M4ribun6LAsYAAoUAA8CsCCOkqzqJsPqFYjUE')
    const { message_id: waitingmessageId } = await  ctx.reply(`On it, ${from.first_name} 🔃😎`)




    const startTime = new Date();
    startTime.setHours(0,0,0,0)

    const endTime = new Date();
    endTime.setHours(23,59,59,999)

    const events = await event.find({
        tgId: from.id,
        createdAt: {
            $gte: startTime,
            $lte: endTime
        },

    })
     
    const currentUser =  await user.findOne({
        tgId: from.id,
        promptTokens: {$gte: 5000}
     }) 

     if(currentUser){
        ctx.reply('You have reached or exceeded the /generate limit.')
     } 

     if(events.length === 0){
        await ctx.deleteMessage(waitingmessageId)
        await ctx.deleteMessage(LoadstickerId)  
        await ctx.reply("No events for the day.")
        return
     }



     try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});
     const prompt = `Write three engaging social media posts tailored for LinkedIn, Facebook, and Twitter:(content must me decent not less not more) audiences. Also do not edit prompt based on the event i have provided like it should only relate to social media posts,. Use simple language like a human not a kid. Use given time labels just to understand the order of the event, don't mention the time in the posts. Each post should creatively highlight the following events: ${events.map((event) => event.text).join(',')}. Ensure the tone is conversational and impactful. Focus on engaging the respective platform's audience, encouraging interaction, and driving interest in the events. and format it well`
     const result = await model.generateContent(prompt);
     console.log(result)
     
     await user.findOneAndUpdate({tgId: from.id},{
        $inc: {
             promptTokens: result.response.usageMetadata?.promptTokenCount,
             completionTokens: result.response.usageMetadata?.candidatesTokenCount
        }
     })

           
       
         await ctx.deleteMessage(waitingmessageId)
         await ctx.deleteMessage(LoadstickerId)    
         await ctx.reply(result.response.text());

     } 
     catch (error) {
        console.log(error)  
        ctx.reply("failde to crate post 😔")
     }
    
}




export default generate