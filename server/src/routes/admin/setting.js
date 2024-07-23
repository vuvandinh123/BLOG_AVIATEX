'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const checkAuthencation = require('../../middlewares/checkAuthencation');
const PostController = require('../../controllers/post.controller');
const SettingController = require('../../controllers/setting.controller');

const router = express.Router();

router.get('/', asyncHandler(SettingController.getSetting))
router.put('/', asyncHandler(SettingController.updateSetting))

module.exports = router