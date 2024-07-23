'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const checkAuthencation = require('../../middlewares/checkAuthencation');
const PostController = require('../../controllers/post.controller');

const router = express.Router();

router.get('/', asyncHandler(PostController.getAllPostByAdmin))
router.get('/:id', asyncHandler(PostController.getPostById))
router.post('/', asyncHandler(PostController.createPost))
router.put('/:id', asyncHandler(PostController.updatePost))
router.delete('/:id', asyncHandler(PostController.deletePost))
router.patch('/:id/status', asyncHandler(PostController.changeStatusPost))

module.exports = router