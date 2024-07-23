'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const SubscriberController = require('../../controllers/subscriber.controller');

const router = express.Router();

router.post('/', asyncHandler(SubscriberController.subscribe))

module.exports = router