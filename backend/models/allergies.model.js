const mongoose = require('mongoose');

const allergiesSchema = new mongoose.Schema({
  name: [{ type: String }]
});

module.exports = mongoose.model('Allergy', allergiesSchema);
