"use strict"

const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const path = require('path');
const app = express();
const morgan = require('morgan');

// init middlewares
app.use(morgan('dev'))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins
}));

// config upload file
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// router
app.use('/api/v1/', require('./routes'))

// handle error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
        stack: error.stack,
    })
})
module.exports = app