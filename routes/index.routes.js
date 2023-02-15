const express = require('express');
const Property = require('../models/Property.model');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
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
