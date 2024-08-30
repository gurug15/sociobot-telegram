import user from "../models/user";

const start = async(ctx:any)=>{
    // console.log(ctx)
    // console.log(ctx.update.message.from)
    const from = ctx.update.message.from

    try {
        await user.findOneAndUpdate({tgId: from.id},{
            $setOnInsert:{
                firstName: from.first_name,
                lastName: from.last_name,
                isBot: from.is_bot,
                username: from.username,
            }
        },{upsert: true, new: true})
        await ctx.reply(`Hey! ${from.first_name}, Welcome. I will be writing highly engaging social media posts for you 🚀. Just keep feeding me with the events throughout the day. Let's shine on social media ✨.`
        )
    } catch (error) {
        console.log(error); 
        ctx.reply("Facing difficulties!")
    }

}

export default start;