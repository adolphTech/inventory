const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../../models/users/users.model");


const {ensureAuthenticated} = require("../../middlewares/auth")

const {
    renderLoginPage,
    renderRegisterPage,
    httpUserRegister,
    httpUserLogin,
    httpUserLogout,
    httpMyAccount,

} = require("./users.controller")


const usersRouter = express.Router();

// pages

usersRouter.get("/me",ensureAuthenticated,httpMyAccount)


usersRouter.get("/login",renderLoginPage);
usersRouter.get("/register",ensureAuthenticated,renderRegisterPage);

usersRouter.post("/register",ensureAuthenticated,httpUserRegister);

usersRouter.post("/login",httpUserLogin);
usersRouter.get("/logout",ensureAuthenticated,httpUserLogout);



module.exports = usersRouter