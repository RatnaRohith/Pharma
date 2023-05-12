const express = require('express');

const Customer = require('../models/customer.model');
const Medicine = require('../models/medicine.model');
const Sale = require('../models/sale.model');

const router = express.Router();

router.post('/medicines/verify/id-provided', async (req, res) => {
  try {
    const { customerId, medicineId } = req.body.data;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    await Sale.findOneAndUpdate({ customer: customerId, medicine: medicineId }, { $set: { processed: true } }, { useFindAndModify: true })

    return res.status(201).json({ message: 'Verification successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /medicines/verify
// Verify customer's ID for medicine purchase
router.post('/medicines/verify', async (req, res) => {
  try {
    const { customerId, medicineId } = req.body.data;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    if (medicine.requiresIdVerification && customer.age < 18) {
      // Send alert to staff for ID verification
      return res
        .status(200)
        .json({
          message: `ID Verification Required.  ${customer.name} is trying to purchase ${medicine.name} which requires ID verification since he is below 18.`,
        });
    }

    await Sale.findOneAndUpdate({ customer: customerId, medicine: medicineId }, { $set: { processed: true } }, { useFindAndModify: true })

    return res.status(201).json({ message: 'Verification successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /medicines/low-stock
// Get medicines with low stock
router.get('/medicines/low-stock', async (req, res) => {
  try {
    const lowStockMedicines = await Medicine.find({ quantity: { $lt: 10 } });
    if (lowStockMedicines.length > 0) {
      // Send alert to staff for low stock
      const message = lowStockMedicines
        .map((medicine) => `${medicine.name} (${medicine.quantity} left)`)
        .join('\n');
      console.log('message: ', message);
      return res
        .status(200)
        .json({
          message: `The following medicines are running low on stock:\n${message}`,
          data: lowStockMedicines,
        });
    }

    res.status(200).json({ message: 'No Low Quantity medicines', data: [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
