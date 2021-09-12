/**
 * The starting point of the application
 *
 * @author Oscar Elf
 * @version 1.0.0
 */

'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('./configs/mongoose');
require('dotenv').config();

// Environment variables
const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION;

// Create express application
const app = express();

// Helmet security
app.use(helmet());

// Connects to the database
mongoose.connect().catch((error) => {
  console.error(error);
  process.exit(1);
});

// Additional middlewares
app.use(cors()); // Connect/Express middleware
app.use(logger('dev')); // Request logger
app.use(express.json()); // Parses JSON

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    const headers = {};
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    return res.status(200).json({});
  } else {
    next();
  }
});

// Routes
app.use('/api', require('./routes/root'));

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}/api`);
  console.log('Press Ctrl-C to terminate...');
});
