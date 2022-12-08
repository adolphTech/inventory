const mongoose = require("mongoose");

const validator = require("validator");

const disbursementSchema = new mongoose.Schema({

    personalNumber:{
           type:String,
            required:true,
            trim:true,
            uppercase:true,
    },
    userName:{
        type:String,
        required:true,
        uppercase:true,
    },
    department:{
        type:String,
        required:true,
        uppercase:true,
    },
    itemCode:{
        type:String,
        required:true,
        uppercase:true,
    },
    quantity:{
        type:Number,
        required:true,
        uppercase:true,
        
    },
    approvedBy:{
        type:String,
        required:true, 
        uppercase:true,
    },
    dateAdded:{
        type:Date,
        default:Date.now()
    }
    
    })
    
    const Disburse = mongoose.model("Disburse",disbursementSchema)
        
       module.exports = Disburse; 