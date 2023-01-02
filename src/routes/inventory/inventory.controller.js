const FromStore = require("../../models/FromStore.model");
const StockUpdate = require("../../models/StockUpdateHistory.model");
const moment = require("moment")

// pages to render
async function renderInvPage(req,res){
        try{
              
           res.render("inventory.hbs")
        }
        catch(e){
          console.log(e)
        }


        
}

async function renderStockPage(req,res){
  try{
        
     res.render("manageStocks.hbs")
  }
  catch(e){
    console.log(e)
  }


  
}


// ---pages to render

// get all data from store
async function httpGetAllFromStore(req,res){
    try {
        const allFromStore = await FromStore.find({},{__v:0,_id:0})
        res.send(allFromStore)      
      }
      
      catch (e) {
        res.status(500).send(e)
      }
      
}

//add new items to store database
async function httpAddNewFromStore(req,res){
    const newStock = new FromStore(req.body)
    req.body.updatedBy = req.user.name;
    try{
   
        await newStock.save();
        res.status(201).send(newStock)


    }
    catch(err){
        res.status(500).send(err)
    } 
}

 //the following function will be used to update the number of equipments in the stock adding 
async function httpUpdateStockFromStore(req,res){
     try{
        let itemCode = (req.body.itemCode);
        let quantityToAdd = (req.body.quantityReceived);
        const updatedBy = req.user.name;

        const inStore = await FromStore.find({itemCode})

        const currentQuantityInStore = inStore[0].quantityReceived;
        const itemName = inStore[0].itemName;
        const myObjectId = inStore[0]._id.toString();
        
       const quantityToAddInt = parseInt(quantityToAdd)
        const updatedStock = currentQuantityInStore + (quantityToAddInt);
       
        // console.log(`${quantityToAdd} units of ${itemName} added successfully : to ${updatedStock}`);

        
        //saving to history
        const toHistorySave = {
           itemCode,
           itemName,
           quantityReceived:quantityToAdd,
           updatedBy,

        }
          
        const history = new StockUpdate(toHistorySave);

        await history.save()
        
        //stock adding

        const stockUpdateReq = {quantityReceived:updatedStock}
    
        // const results =
         await FromStore.findByIdAndUpdate(myObjectId,stockUpdateReq,{new :true , runValidator:true})

              // res.status(201).send(results)
            //  res.send(results)// 
            req.session.message = {
              type:"success",
              intro:`${quantityToAdd} units of ${itemName} added successfully !!!`,
              message: ` ${updatedStock} items in store now`
          }
          res.redirect("/flash")
     }
     catch(err){
        res.status(500).send(err.message)
     }

}

async function httpGetAllFromStockUpdates(req,res){
    try {
        const allFromStock = await StockUpdate.find({},{__v:0,_id:0})
        
        const resArray = [];
        
        allFromStock.forEach(element => {

            let resObj  ={};


       const itemCode = element.itemCode;
       const itemName = element.itemName
       const quantity =element.quantityReceived;
       const updatedBy  =element.updatedBy;
       const date = (moment(element.dateAdded).format("DD-MM-YYYY"));
       const time = (moment(element.dateAdded).format("hh:mm"));
        
      
       resObj.itemCode = itemCode;
       resObj.itemName = itemName;
       resObj.quantity = quantity;
       resObj.updatedBy = updatedBy;
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


module.exports = {
    httpGetAllFromStore,
    httpAddNewFromStore,
    httpUpdateStockFromStore,
    httpGetAllFromStockUpdates,
    renderInvPage,
    renderStockPage,
    
}