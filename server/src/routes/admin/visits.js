'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const VisitsController = require('../../controllers/visits.controller');

const router = express.Router();

router.get('/', asyncHandler(VisitsController.getVisits))
router.get('/dashboard', asyncHandler(VisitsController.getDataCountDashboard))

module.exports = router