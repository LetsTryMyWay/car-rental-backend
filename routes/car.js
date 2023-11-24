// Server/routes/car.js
const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Create a new car
router.post('/', async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error creating car' });
  }
});


// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Error getting cars' });
  }
});

// Get a specific car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error getting car' });
  }
});

// Update a car by ID
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error updating car' });
  }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting car' });
  }
});


router.post('/:id/book', async (req, res) => {
  try {
    const carId = req.params.id;

    // Fetch the car from the database
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Implement the booking logic here (e.g., set a booked flag, update booking information)

    // Save the changes to the database
    await car.save();

    res.json({ message: 'Car booked successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Booking failed' });
  }
});

module.exports = router;













