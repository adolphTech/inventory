const express = require("express");
const moment = require("moment")

const FromStore = require("../../models/FromStore.model");

const {
    httpGetAllDisbursements,
    httpAddNewDisbursements,
 
    
} = require("./disbursement.controller");



const disbursementRouter = express.Router();

disbursementRouter.get("/all",httpGetAllDisbursements);
disbursementRouter.post("/",httpAddNewDisbursements);


// disbursementRouter.post("/stock/add",httpUpdateStockFromStore)
// disbursementRouter.get("/stock/history",httpGetAllFromStockUpdates)

module.exports= disbursementRouter;