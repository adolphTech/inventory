const express = require("express");

const FromStore = require("../../models/FromStore.model");

const {ensureAuthenticated} = require("../../middlewares/auth");

const {
    httpGetAllFromStore,
    httpAddNewFromStore,
    httpUpdateStockFromStore,
    httpGetAllFromStockUpdates,
    renderInvPage,
    renderStockPage,

} = require("./inventory.controller");



const inventoryRouter = express.Router();



inventoryRouter.get("/all",ensureAuthenticated,httpGetAllFromStore);
inventoryRouter.post("/",ensureAuthenticated,httpAddNewFromStore);

inventoryRouter.get("/",ensureAuthenticated,renderInvPage);
inventoryRouter.get("/stocks",ensureAuthenticated,renderStockPage);

inventoryRouter.post("/stock/add",ensureAuthenticated,httpUpdateStockFromStore);
inventoryRouter.get("/stock/history",ensureAuthenticated,httpGetAllFromStockUpdates);

module.exports=inventoryRouter;