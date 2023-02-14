const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => { // the last call back should send something to the client
  console.log("SESSION =====> ", req.session)
  // if(!req.session.user){ // this was when there was no middle ware
  //   res.redirect('/auth/login')
  // } 
  res.render("profile", { user: req.session.user });
  console.log(req.session.user)
  

});

router.get("/home", (req, res, next) => { // the last call back should send something to the client
  console.log("SESSION =====> ", req.session)
  // if(!req.session.user){ // this was when there was no middle ware
  //   res.redirect('/auth/login')
  // } 
  res.render("home", { user: req.session.user });
  

});

module.exports = router;

