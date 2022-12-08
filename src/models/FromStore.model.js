const mongoose = require("mongoose");

const validator = require("validator");

const fromStoreSchema = new mongoose.Schema({

    itemCode:{
           type:String,
            required:true,
            trim:true,
            uppercase:true, 
    },
    itemName:{
        type:String,
        required:true,
        uppercase:true,
        unique:true
    },
    quantityReceived:{
        type:Number,
        required:true,
        uppercase:true,
        default:0
    }
    
    })
    
    const FromStore = mongoose.model("FromStore",fromStoreSchema)
        
       module.exports = FromStore; 