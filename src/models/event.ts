import { model, Schema } from "mongoose";


export type  Event = {
    text: string,
    tgId: string,
}


const eventSchema = new Schema<Event>({
    text : {
        type: String,
        required: true,
    },
    tgId: {
        type: String,
        required: true,
    }

},{timestamps: true})


export default model('Event',eventSchema)