'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const checkAuthencation = require('../../middlewares/checkAuthencation');
const PostController = require('../../controllers/post.controller');
const WorkController = require('../../controllers/works.controller');

const router = express.Router();

router.get('/', asyncHandler(WorkController.getAllWorkByAdmin))
router.get('/:id', asyncHandler(WorkController.getWorkById))
router.post('/', asyncHandler(WorkController.createWork))
router.put('/:id', asyncHandler(WorkController.updateWork))
router.delete('/:id', asyncHandler(WorkController.deleteWork))

module.exports = router