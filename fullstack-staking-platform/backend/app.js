const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const sql = require('mssql');
const authMiddleware = require('./authMiddleware');
const rbacMiddleware = require('./rbacMiddleware');

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Database configuration
const config = require('./config');
sql.connect(config.db, err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected.');
  }
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const horseRoutes = require('./routes/horseRoutes');
const raceSeriesRoutes = require('./routes/raceSeriesRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const billingPreferencesRoutes = require('./routes/billingPreferencesRoutes');
const raceRoutes = require('./routes/raceRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/owners', authMiddleware, ownerRoutes);
app.use('/api/horses', authMiddleware, horseRoutes);
app.use('/api/race_series', authMiddleware, raceSeriesRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/billing-preferences', authMiddleware, billingPreferencesRoutes);
app.use('/api/races', authMiddleware, rbacMiddleware('admin'), raceRoutes); // Protected admin route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
