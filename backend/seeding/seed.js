const mongoose = require('mongoose');
const Customer = require('../models/customer.model');
const Medicine = require('../models/medicine.model');
const Sale = require('../models/sale.model');

const { medicines, customers } = require("./data");

Customer.insertMany(customers).then(() => {
  console.log('Customers seeded successfully');
}).catch(err => {
  console.log('Error seeding customers', err);
});

// Medicine.insertMany(medicines).then(() => {
//   console.log('Medicines seeded successfully');
// }).catch(err => {
//   console.log('Error seeding medicines', err);
// });

// Sale.insertMany(sales).then(() => {
//   console.log('Sales seeded successfully');
// }).catch(err => {
//   console.log('Error seeding sales', err);
// });
