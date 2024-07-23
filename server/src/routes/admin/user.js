'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const VisitsController = require('../../controllers/visits.controller');
const UserController = require('../../controllers/user.controller');

const router = express.Router();

router.get('/', asyncHandler(UserController.getUser))
router.patch('/', asyncHandler(UserController.updateUsernameAndNameUser))
module.exports = router