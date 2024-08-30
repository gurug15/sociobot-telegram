import  { Schema, model } from "mongoose";

interface TUser {
    tgId: string;
    firstName: string;
    lastName: string;
    isBot: Boolean;
    username: String;
    promptTokens: Number;
    completionTokens: Number; 
  }


const userSchema = new Schema<TUser>({
    tgId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    isBot: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    promptTokens: {
        type: Number,
        required: false
    },
    completionTokens:{
        type: Number,
        required: false
    }

},{timestamps: true})


export default model('User', userSchema)