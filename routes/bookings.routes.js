const express = require('express');
const Booking = require('../models/Booking.model');
const User = require('../models/User.model');
const router = express.Router();

// router.get('/', async(req, res, next)=>{
//   try{
//     const
//   }
// })

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const allBookings = await Booking.find();
    console.log('All bookings:', allBookings);
    res.render('bookings/all', { hopper: allBookings });
  } catch (error) {
    console.log('Route to all bookings', error);
  }
});

// Create a new booking
router.get('/new', async (req, res, next) => {
  res.render('bookings/new', { update: false });
});


// Get a specific booking by ID
router.get('/:bookingId', async (req, res) => {
  const bookingFound = await Booking.findById(req.params.bookingId).populate('user');
  console.log({ bookingFound });
  res.render('bookings/one', { bookingFound });
});

router.post('/new', async (req, res) => {
  const body = req.body;
  console.log(body);

  // const user = req.session.userId;

  await Booking.create({
    ...body,
    description: body.description,
    // user: '63ebbf7c5ce2ea8ac0f0a14f',
  });

  res.redirect('/bookings');
});

// Update a specific booking by ID
router.get('/:bookingId/update', async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);
  res.render('bookings/new', { booking, update: true });
});

router.post('/:bookingId/update', async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.bookingId, {
    ...req.body,
    description: req.body.description,
  });

  res.redirect(`/bookings/${req.params.bookingId}`);
});

// Delete a specific booking by ID
router.get('/:bookingId/delete', async (req, res) => {
  await Booking.findByIdAndDelete(req.params.bookingId);

  res.redirect('/bookings');
});

module.exports = router;