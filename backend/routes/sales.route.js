const authUser = require('../middlewares/authUser');
const express = require('express');

const Sale = require('../models/sale.model');
const Store = require('../models/store.model');
const Allergy = require('../models/allergies.model');
const Medicine = require('../models/medicine.model');
const MedicalCondition = require('../models/medicalCondition.model');

const router = express.Router();

// API endpoints for Sale model
router.post('/', async (req, res) => {

  try {

    const medicine = await Medicine.findOne({ _id: req.body.data.medicine });

    if (req.body.data.quantity >= medicine.quantity) {
      res.status(400).send(`Ordered quantity must be less than the quantity in Inventory which is ${medicine.quantity}`)
      return;
    }

    const sale = new Sale(req.body.data);

    await Medicine.findByIdAndUpdate({ _id: req.body.data.medicine }, { $set: { quantity: (medicine.quantity - req.body.data.quantity) } });

    await sale.save();
    res.send(sale);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/get-total-sales', async (req, res) => {
  try {
    const sales = await Sale.countDocuments();
    res.status(200).send({ data: sales });
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('customer').populate('medicine');
    res.send(sales);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get-stores", async (req, res) => {
  try {
    const stores = await Store.find();
    res.send(stores);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/create-store", async (req, res) => {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  // return
  try {
    const store = new Store({
      name: req.body.store.name
    });
    await store.save();
    res.send(store);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update-store/:id", async (req, res) => {
  try {
    const findedStore = await Store.findById(req.params.id);
    const store = await Store.findByIdAndUpdate(req.params.id, req.body.store, { useFindAndModify: true });

    const inv = await Medicine.find({ store: findedStore.name });

    if (inv.length > 0) {
      await Medicine.updateMany({ store: findedStore.name }, { $set: { store: req.body.store.name } })
    }

    res.send(store);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get-allergies", async (req, res) => {
  try {
    const allergy = await Allergy.find();
    res.send(allergy);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get-medical-conditions", async (req, res) => {
  try {
    const medicalCondition = await MedicalCondition.find();
    res.send(medicalCondition);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const medicalCondition = await Sale.findByIdAndRemove(req.params.id, { useFindAndModify: true });
    res.send(medicalCondition);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/delete-store/:id", async (req, res) => {

  try {
    const findedStore = await Store.findById(req.params.id);

    const inv = await Medicine.find({ store: findedStore.name });

    const store = await Store.findByIdAndRemove(req.params.id, { useFindAndModify: true });

    if (inv.length > 0) {
      await Medicine.deleteMany({ store: findedStore.name })
    }
    res.send(store);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.put('/:id', getSale, async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body.data, { useFindAndModify: true })
    console.log("updatedSale", updatedSale);
    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getSale(req, res, next) {
  try {
    const medicine = await Sale.findById(req.params.id);
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
