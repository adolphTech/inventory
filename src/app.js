const express = require("express");
const app  = express();
const hbs = require("hbs");
const path = require("path");
const cors = require("cors");
const ejs = require('ejs');
const morgan = require("morgan"); 
const cookieparser = require("cookie-parser");
require("./db/mongoose");
const flash = require ("connect-flash");
const bodyParser = require('body-parser')
const session = require("express-session");
const passport = require("passport");

const FromStore = require("./models/FromStore.model");
const StockUpdate = require("./models/StockUpdateHistory.model");
const Disburse    = require("./models/disburse.model")

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));



//passport config
require("./middlewares/passport")(passport); 

const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

const {ensureAuthenticated} = require("./middlewares/auth")


app.use(cors());

// app.use(morgan("combined"));
app.use(express.json())

app.use(cookieparser("secret"));

//express session middleware
app.use(session({
    name : 'flash',
    secret : process.env.SESSION_SECRET,
    resave: true,//false
    saveUninitialized: true,
    cookie : {
            maxAge:(1000 * 60 * 100)
    }   
    
}));

//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

//connect flash

app.use(flash());

//global vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})


//flash message


app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message
    next();
})

// // routes
// const userRouter = require("./routes/users/user.router")


// // routers
// app.use(userRouter)


app.use(express.static(publicDirectoryPath))


app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); 

app.set('view engine', 'ejs');

//routepaths
const inventoryRouter = require("./routes/inventory/inventory.router")
const disbursementRouter = require("./routes/disbursement/disbursement.router")
const usersRouter = require("./routes/users/user.router");
const { parseTwoDigitYear } = require("moment");

//routes
app.use("/inventory",inventoryRouter);
app.use("/disburse",disbursementRouter); 
app.use("/users",usersRouter);


app.get("/flash",(req,res)=>{
    res.status(400).render("messages.hbs")
    // res.render(index)
})

 
app.get("/",async(req,res)=>{
    try{
        let cardData = {};
          await FromStore.find({})
          .count()
          .then((count)=>{
           cardData.count = count
          })
           

         await FromStore.find({quantityReceived:0})
         .count()
         .then((count)=>{
            cardData.zeroStock = count
         })

        
          res.render("index.hbs",{cardData})
    } catch(e){
        console.log(e)
    }
   
}) 



module.exports = app;