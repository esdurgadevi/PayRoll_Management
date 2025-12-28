// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/health', (_, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/auth', authRoute);

// Error handling (last)
app.use(errorHandler);

module.exports = app;