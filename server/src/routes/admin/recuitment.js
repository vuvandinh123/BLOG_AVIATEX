'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const checkAuthencation = require('../../middlewares/checkAuthencation');
const PostController = require('../../controllers/post.controller');
const RecruitmentController = require('../../controllers/recruitment.controller');

const router = express.Router();
router.use(checkAuthencation)
router.get('/', asyncHandler(RecruitmentController.getAllRecruitmentByAdmin))
router.get('/:id', asyncHandler(RecruitmentController.getRecruitmentById))
router.post('/', asyncHandler(RecruitmentController.createRecruitment))
router.put('/:id', asyncHandler(RecruitmentController.updateRecruitment))
router.delete('/:id', asyncHandler(RecruitmentController.deleteRecruitment))
router.patch('/:id/status', asyncHandler(RecruitmentController.changeStatusRecruitment))

module.exports = router