const mongoose = require("mongoose");
// const moment = require("moment")
// const validator = require("validator");

const stockUpdateSchema = new mongoose.Schema({

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
    },
    quantityReceived:{
        type:Number,
        required:true,
        uppercase:true,
        
    },
    updatedBy:{
        type:String,
        required:true,
        uppercase:true,
        
    },
    dateAdded:{
        type:Date,
        default:Date.now()
    }
    
    })
    
    const StockUpdate = mongoose.model("StockUpdate",stockUpdateSchema)
        
       module.exports = StockUpdate; 