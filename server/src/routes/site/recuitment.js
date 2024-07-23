'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const RecruitmentController = require('../../controllers/recruitment.controller');

const router = express.Router();
router.get('/', asyncHandler(RecruitmentController.getAllRecruitmentByAdmin))
router.get('/:id', asyncHandler(RecruitmentController.getRecruitmentById))
module.exports = router