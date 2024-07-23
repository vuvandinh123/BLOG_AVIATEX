'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const SettingController = require('../../controllers/setting.controller');

const router = express.Router();

router.get('/', asyncHandler(SettingController.getSetting))

module.exports = router