const express = require('express');
const Property = require('../models/Property.model');
const User = require('../models/User.model')
const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const allProperties = await Property.find()
    console.log('All properties :', allProperties)
    res.render('properties/all', { hopper: allProperties })
  } catch (error) {
    console.log('Route to all properties', error)
  }
});

// Create a new property
router.get('/new', async (req, res, next) => {
  res.render('properties/new', { update: false })
});
  
// Get a specific property by ID
router.get('/:propertyId', async (req, res) => {
  const propertyFound = await Property.findById(req.params.propertyId).populate('owner')
  console.log({ propertyFound })
  res.render('properties/one', { propertyFound })
})

router.post('/new', async (req, res) => {
  const body = req.body
  console.log(body)
  await Property.create({
    ...body,
    description: body.description.split(' '),
    owner: '63e108a5cfca86248667cacf',
  })

  res.redirect('/properties')
})

// Update a specific property by ID
router.get('/:propertyId/update', async (req, res) => {
  const property = await Property.findById(req.params.propertyId)
  res.render('properties/new', { property, update: true })
})

router.post('/:propertyId/update', async (req, res) => {
  await Property.findByIdAndUpdate(req.params.propertyId, {
    ...req.body,
    description: req.body.description.split(' '),
  })

  res.redirect(`/properties/${req.params.propertyId}`)
})
  
// Delete a specific property by ID
router.post('/:propertyId/delete', async (req, res) => {
  await Property.findByIdAndDelete(req.params.propertyId)

  res.redirect('/recipes')
})

module.exports = router;