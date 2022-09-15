import mongoose from "mongoose";
import validator from"validator"

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        validate(val){
            if(!validator.isEmail(val))
            {
                    throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        require:true,
        min:10
    },
    message:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model("User",userSchema);

export {User}