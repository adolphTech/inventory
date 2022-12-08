const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }, 
    email:{
        type:String,
        unique: true,
        required: true, 
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid ")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password cannot contain'password' ")
            }
        }
        },
        date:{
            type:Date,
            default:Date.now
        }
    } 
    )



const User = mongoose.model("User",userSchema)
    
   module.exports = User;