'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const PostController = require('../../controllers/post.controller');

const router = express.Router();

router.get('/', asyncHandler(PostController.getAllPostByUser))
router.get('/search', asyncHandler(PostController.getSearch))
router.get('/:id', asyncHandler(PostController.getPostById))

module.exports = router