const mongoose = require("mongoose");


 function connection(){
    mongoose.connect(process.env.MONGO_URI)
    // mongoose.connect("mongodb://127.0.0.1:27017/ictInventory")
    .then(()=>{
        console.log("connected.......")
    })
    .catch((err)=>{
        console.log(err.message)
    })
    

}

// connection();

module.exports = {connection};


