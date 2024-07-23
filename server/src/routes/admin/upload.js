'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const TopicController = require('../../controllers/topic.controller');
const UploadController = require('../../controllers/upload.controller');
const upload = require('../../configs/multerConfig');
const router = express.Router();
router.post('/', upload.single('image'), asyncHandler(UploadController.uploadFile))
router.delete('/:filename', asyncHandler(UploadController.deleteFile))
module.exports = router