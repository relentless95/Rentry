const express = require('express');
const router = express.Router();
const Property = require('../models/property.model.js');

// Create a new property
router.post('/property', async (req, res) => {
    try {
      const property = new Property(req.body);
      await property.save();
      res.status(201).json(property);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Get all properties
router.get('/property', async (req, res) => {
    try {
      const properties = await Property.find();
      res.json(properties);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Get a specific property by ID
router.get('/property/:id', getProperty, (req, res) => {
    res.json(res.property);
  });
  
// Update a specific property by ID
router.patch('/property/:id', getProperty, async (req, res) => {
    if (req.body.name != null) {
      res.property.name = req.body.name;
    }
    if (req.body.description != null) {
      res.property.description = req.body.description;
    }
    if (req.body.price != null) {
      res.property.price = req.body.price;
    }
    try {
      const updatedProperty = await res.property.save();
      res.json(updatedProperty);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Delete a specific property by ID
router.delete('/property/:id', getProperty, async (req, res) => {
    try {
      await res.property.remove();
      res.json({ message: 'Property deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
async function getProperty(req, res, next) {
    let property;
    try {
      property = await Property.findById(req.params.id);
      if (property == null) {
        return res.status(404).json({ message: 'Cannot find property' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.property = property;
    next();
  }
  
 /* The getProperty function is used as middleware to retrieve a specific property by ID for updating and deleting */

module.exports = router;