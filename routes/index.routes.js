const express = require('express');
const Property = require('../models/Property.model')
const { isLoggedIn } = require('../middleware/route-guard');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile",isLoggedIn, (req, res, next) => { // the last call back should send something to the client
  console.log("SESSION =====> ", req.session)
  // if(!req.session.user){ // this was when there was no middle ware
  //   res.redirect('/auth/login')
  // } 
  // console.log('the body is', req.body)
  // const user = req.body.username
  // console.log('the user here is is', user)
  res.render("profile", { user: req.session.user });
  console.log(req.session.user)
  

});

router.get("/home",isLoggedIn, (req, res, next) => { // the last call back should send something to the client
  console.log("SESSION =====> ", req.session)
  // if(!req.session.user){ // this was when there was no middle ware
  //   res.redirect('/auth/login')
  // } 
  res.render("home", { user: req.session.user });
  

});

/* GET properties page */
router.get("/properties", async (req, res, next) => {
  try {
    const allProperties = await Property.find()
    console.log('All properties :', allProperties)
    res.render('properties/all', { hopper: allProperties })
  } catch (error) {
    console.log('Route to all properties', error)
  }
});



module.exports = router;

