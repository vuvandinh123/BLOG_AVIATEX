'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const TopicController = require('../../controllers/topic.controller');

const router = express.Router();

router.get('/', asyncHandler(TopicController.getAllTopicByAdmin))
router.post('/', asyncHandler(TopicController.createTopic))
router.put('/:id', asyncHandler(TopicController.updateTopic))
router.delete('/:id', asyncHandler(TopicController.deleteTopic))
module.exports = router