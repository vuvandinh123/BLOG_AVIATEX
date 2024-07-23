'use strict'
const express = require('express');
const asyncHandler = require('../../middlewares/asyncHandle');
const TopicController = require('../../controllers/topic.controller');
const DepartmentController = require('../../controllers/department.controller');

const router = express.Router();

router.get('/', asyncHandler(DepartmentController.getAllDepartmentByAdmin))
router.post('/', asyncHandler(DepartmentController.createDepartment))
router.put('/:id', asyncHandler(DepartmentController.updateDepartment))
router.delete('/:id', asyncHandler(DepartmentController.deleteDepartment))
module.exports = router