const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User.model');




/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {

    const body = {...req.body};

    if(body.password.length < 6) {
      res.render("auth/signup", {
        error: "Password must be at least 5 characters long", body: req.body
      })}
      else{
        const salt = await bcrypt.genSalt(14);
        console.log(body.password);

        const passwordHash = bcrypt.hashSync(body.password, salt);
        
    
        delete body.password;
    
        body.passwordHash = passwordHash;

        try {
          await User.create(body)
          res.send(body);
         }
          catch (error) {
          if (error.code === 1100) {
            console.log('deplicated!');
            res.render ("auth/signup", {
              error: "username already used ", body: req.body
            })
           
          }
         
          else{
            console.log(error)

        
      }}}

    });
        
      router.get("/login", (req, res, next) => {
        res.render("auth/login");
      });



      router.post("/login", async (req, res, next) => {
        
        const body = req.body
        userMatch = await User.find({ username: body.username })
        console.log(userMatch)

        if(userMatch.length){
          const user = userMatch[0];
          
          if(bcrypt.compareSync(body.password, user.passwordHash)){
            
            const tempUser = {}
            tempUser.username = user.username;
            tempUser.email = user.email;
            

            req.session.user = tempUser;
            res.redirect('/profile');

          }

        }else{


        }
        });  


     

       
       

        

        

   
    

module.exports = router;
