const Disburse = require("../../models/disburse.model");
const FromStore = require("../../models/FromStore.model");
const moment = require("moment")

// async function renderDisburseHistory(req,res){
//     res.render("disburseHistory.hbs")
// }




async function httpGetAllDisbursements(req,res){
    try {
        const allFromStore = await Disburse.find({},{__v:0,_id:0})
           
        const resArray = [];
        
        allFromStore.forEach(element => {

            let resObj  ={};

       const personalNumber = element.personalNumber;
       const userName = element.userName;
       const department = element.department;
       const itemCode = element.itemCode;
       const quantity =element.quantity;
       const approvedBy =element.approvedBy;
       const date = (moment(element.dateAdded).format("DD-MM-YYYY"));
       const time = (moment(element.dateAdded).format("hh:mm"));

       resObj.personalNumber=personalNumber;
       resObj.userName  = userName;
       resObj.department = department;
       resObj.itemCode = itemCode;
       resObj.quantity = quantity;
       resObj.approvedBy= approvedBy;
       resObj.date    =date
       resObj.time = time;
 
            // console.log(resObj)

            resArray.push(resObj)


        });
       
        res.send(resArray)

      }
      
      catch (e) {
        res.status(500).send(e)
      }
      
}
 
async function httpAddNewDisbursements(req,res){
    const itemCode = req.body.itemCode;
    const receiverName = req.body.userName;
    // console.log(req.body)
   
    
    try{
          
        const allFromStore = await FromStore.find({itemCode})
    

        
    const myObjectId = allFromStore[0]._id.toString();

    const quantityInStore = allFromStore[0].quantityReceived 
    const itemName = allFromStore[0].itemName

        if(quantityInStore <= 0 ){
            req.session.message = {
                type:"danger",
                intro:`${itemName}! `,
                message:"This Item is out of stock"
            }
            
            res.redirect("/flash")
           
        }
        else{
            req.body.approvedBy = req.user.name;
            const newDisburse = new Disburse(req.body)
            await newDisburse.save()
            // res.send(newDisburse)

         //update the stocks subtract
         if(req.body.quantity > quantityInStore){
            // res.send(`Only ${quantityInStore} item(s) remaining`)
            req.session.message = {
                type:"danger",
                intro:"Restock ! ",
                message:`Only ${quantityInStore} unit (s) of ${itemName} remaining`
            }
            res.redirect("/flash")
         }else{

         const newStockUpdate = (quantityInStore) -(req.body.quantity);
        
         const stockUpdateReq = {quantityReceived:newStockUpdate}
    

         const results = await FromStore.findByIdAndUpdate(myObjectId,stockUpdateReq,{new :true , runValidator:true})


            //  res.send(results)//
            req.session.message = {
                type:"success",
                intro:`${req.body.quantity} unit (s) of ${itemName}`,
                message:` to be received by ${receiverName}`
            }
            res.redirect("/flash")

        }  
    }


    }
    catch(err){
        req.session.message = {
            type:"danger",
            intro:`Error !!!`,
            message:`Please enter a valid ITEM CODE`
        }
        res.status(500).redirect("/flash")

    }
}


module.exports = {
    httpGetAllDisbursements,
    httpAddNewDisbursements,   
}