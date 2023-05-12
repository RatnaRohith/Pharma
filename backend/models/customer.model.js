const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  medicationHistory: [
    {
      medicine: { type: String },
      dosage: { type: String },
      start_date: { type: Date },
      end_date: { type: Date },
    },
  ],
  allergies: [{ type: String }],
  medicalConditions: [{ type: String }],
});

module.exports = mongoose.model('Customer', customerSchema);
