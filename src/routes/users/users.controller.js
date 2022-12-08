const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../../models/users/users.model");


// pages to render
async function renderLoginPage(req,res){
    res.render("login")
}

// register
async function renderRegisterPage(req,res){
    res.render("register")
}




//register handler
async function httpUserRegister(req,res){
    const {name,email,password,password2} = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg:"please fill in all fields"});
    } 

    //check password match
    if(password !== password2){
        errors.push({msg :"passwords do not match"});
    }
   
    //check password length
    if(password.length <6 ){
        errors.push({msg:"password should be atleast 6 characters"});
    }


    if(errors.length > 0){
            res.render("register",{
                errors,
                name,
                email,
                password,
                password2
            }); 
    }
    else{
        //validation passed
 User.findOne({email})
 .then(user =>{
if(user){
    //use exists   
    errors.push({msg :"Email is already registered"});
    res.render("register",{
        errors,
        name, 
        email,
        password,
        password2
    }); 
}else{
 const newUser = new User({
    name,
    email,
    password

 });
// hash password
bcrypt.genSalt(8,(err,salt)=>{
 bcrypt.hash(newUser.password,salt,(err,hash)=>{
  if(err) throw err;

  //set password to hash
  newUser.password = hash

  //save user
  newUser.save()
  .then( user =>{
    req.flash("success_msg","You are now registered and can log in");
    res.redirect("/");
  })
  .catch(err =>console.log(err));
 })
})

}
 });
 

    }

};

//login handle

async function httpUserLogin(req,res,next){
    passport.authenticate("local",{
       successRedirect: "/",
       failureRedirect : "/users/login",
       failureFlash :true
    })(req,res,next);
   };

   //logout handle
async  function httpUserLogout(req, res, next){
    req.logout((err)=>{
      if (err) { return next(err); }

      req.flash("success_msg","You are logged out");
      res.redirect('/users/login');
    });
  };


  async function httpMyAccount(req,res){
    console.log(req.user)
    const name = req.user.name;
    const email = req.user.email;
    const dateJoined= req.user.date
    res.render("myAccount.hbs",{name,email,dateJoined})
}

module.exports = {
    renderLoginPage,
    renderRegisterPage,
    httpUserRegister,
    httpUserLogin,
    httpUserLogout,
    httpMyAccount,
}