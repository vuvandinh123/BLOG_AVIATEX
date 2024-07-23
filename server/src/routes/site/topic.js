'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const TopicController = require('../../controllers/topic.controller');
const router = express.Router();

router.get('/', asyncHandler(TopicController.getAllTopicByAdmin))


module.exports = router