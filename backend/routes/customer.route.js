const authUser = require('../middlewares/authUser');
const express = require('express');

const Customer = require('../models/customer.model');

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single customer
router.get('/:id', getCustomer, (req, res) => {
  res.json(res.customer);
});

// Get a total number of  customer
router.get('/get/total-number-of-customers', async (req, res) => {
  try {
    const customers = await Customer.countDocuments();
    res.send({ data: customers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a customer
router.post('/', async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
    dob: req.body.dob,
    medication: req.body.medication,
    allergies: req.body.allergies,
    medicalConditions: req.body.medicalConditions
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a customer
router.put('/:id', getCustomer, async (req, res) => {
  console.log("Body: ", req.body);
  if (req.body.name != null) {
    res.customer.name = req.body.name;
  }
  if (req.body.address != null) {
    res.customer.address = req.body.address;
  }
  if (req.body.age != null) {
    res.customer.age = req.body.age;
  }
  if (req.body.dob != null) {
    res.customer.dob = req.body.dob;
  }
  if (req.body.medication != null) {
    res.customer.medication = req.body.medication;
  }
  if (req.body.allergies != null) {
    res.customer.allergies = req.body.allergies;
  }
  if (req.body.medicalConditions != null) {
    res.customer.medicalConditions = req.body.medicalConditions;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const user = await Customer.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('There is no Customer with the given ID.');

  res.status(200).send(user);
});

// Middleware function to get a customer by ID
async function getCustomer(req, res, next) {
  console.log("HERE");
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
    res.customer = customer;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
