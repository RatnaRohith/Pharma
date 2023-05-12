const authUser = require('../middlewares/authUser');
const express = require('express');

const Medicine = require('../models/medicine.model');

const router = express.Router();

// API endpoints for Medicine model
router.post('/', async (req, res) => {
  try {
    const medicine = new Medicine(req.body.body);
    await medicine.save();
    res.send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:storeName', async (req, res) => {
  try {
    const medicine = await Medicine.find({ store: req.params.storeName });
    res.send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/get/get-total-medicines', async (req, res) => {
  try {
    const medicine = await Medicine.countDocuments();
    res.send({ data: medicine });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.send(medicines);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const medicines = await Medicine.findByIdAndRemove(req.params.id);
    res.send(medicines);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', getmedicine, async (req, res) => {
  console.log("Body: ", req.body.body);
  // console.log("Body: ", req.body.body.requiresIdVerification);
  // if (req.body.name != null) {
  //   res.medicine.name = req.body.body.name;
  // }
  // if (req.body.quantity != null) {
  //   res.medicine.quantity = req.body.body.quantity;
  // }
  // if (req.body.expriy_date != null) {
  //   res.medicine.expriy_date = req.body.body.expriy_date;
  // }
  // if (req.body.store != null) {
  //   res.medicine.store = req.body.body.store;
  // }
  // if (req.body.requiresIdVerification != null) {
  //   res.medicine.requiresIdVerification = req.body.body.requiresIdVerification;
  // }

  // console.log(" medicine", res.medicine);
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body.body, { useFindAndModify: true })
    // const updatedMedicine = await res.medicine.save();
    console.log("updated medicine", updatedMedicine);
    res.json(updatedMedicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getmedicine(req, res, next) {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (medicine == null) {
      return res.status(404).json({ message: 'Cannot find medicine' });
    }
    res.medicine = medicine;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
