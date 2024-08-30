import event from "../models/event";

 const clear = async (ctx:any)=>{
    
    const from = ctx.update.message.from
    const startTime = new Date();
    startTime.setHours(0,0,0,0)

    const endTime = new Date();
    endTime.setHours(23,59,59,999)

   try {
    await event.deleteMany({
        tgId:from.id,
        createdAt: {
            $gte: startTime,
            $lte: endTime,
        }
    })
    await ctx.reply("cleared todays events")
   } catch (error) {
      console.log(error)
      ctx.reply("Somethings Up with the server")
   }

} 


export default clear