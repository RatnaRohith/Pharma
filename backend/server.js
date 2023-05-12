const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');

const AuthUser = require('./routes/auth-user.route');
const UserRoutes = require('./routes/user.route');
const CustomerRoutes = require('./routes/customer.route');
const MedicineRoutes = require('./routes/medicine.route');
const SalesRoutes = require('./routes/sales.route');
const RiskRoutes = require('./routes/risk.route');

require('dotenv').config();
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

app.get('/started', (req, res) => {
  res.status(200).send('Hello world.');
});

app.use('/api/auth', AuthUser);
app.use('/api/users', UserRoutes);
app.use('/api/customers', CustomerRoutes);
app.use('/api/medicines', MedicineRoutes);
app.use('/api/sales', SalesRoutes);
app.use('/api/risks', RiskRoutes);

//uncaught exception...
const PORT = process.env.PORT || 5000;

// const mongoURI = `mongodb+srv://admin:enterprise@cluster0.o7wgk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const mongoURI = `mongodb://localhost:27017/pharmazeal`;
const mongoURI = `mongodb+srv://iqraashrafkiyani73:staffordshire@cluster0.mkgfytx.mongodb.net/pharmazeal`;

const Customer = require('./models/customer.model');
const Medicine = require('./models/medicine.model');
const Sale = require('./models/sale.model');

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB is connected');
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}...`);
    });

  })
  .catch((err) =>
    console.error('Error is occured during DB connection. ', err)
  );
