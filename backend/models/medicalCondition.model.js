const mongoose = require('mongoose');

const medicalConditionSchema = new mongoose.Schema({
  name: [{ type: String }]
});

module.exports = mongoose.model('MedicalCondition', medicalConditionSchema);
