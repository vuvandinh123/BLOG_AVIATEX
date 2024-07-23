'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const WorkController = require('../../controllers/works.controller');

const router = express.Router();

router.get('/', asyncHandler(WorkController.getAllWorkByAdmin))
router.get('/:id', asyncHandler(WorkController.getWorkById))

module.exports = router