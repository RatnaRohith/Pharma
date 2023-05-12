const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiry_date: { type: String, required: true },
  store: { type: String, required: true },
  requiresIdVerification: { type: Boolean, required: true }
});

module.exports = mongoose.model('Medicine', medicineSchema);
